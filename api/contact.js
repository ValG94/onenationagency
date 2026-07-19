import { Resend } from 'resend';

// ============================================================
// ENDPOINT CONTACT — durci
// ------------------------------------------------------------
// Protections en place :
//   1. Méthode + Content-Type stricts
//   2. Vérification de l'origine (Origin / Referer) → bloque les
//      appels depuis un autre site ou un script hors navigateur
//   3. Rate limiting par IP (fenêtre glissante en mémoire)
//   4. Honeypot anti-bot (champ `website` invisible dans le form)
//   5. Validation stricte : longueurs max + format email
//   6. Échappement HTML de TOUTES les données visiteur
//   7. Le mail de confirmation n'écho plus le message du visiteur
//      (empêchait d'utiliser le domaine comme relais de phishing)
// ============================================================

const AGENCY_EMAIL = 'contact@onenationagency.com';
const FROM = `ONE NATION AGENCY <${AGENCY_EMAIL}>`;

/** Hôtes autorisés à appeler cet endpoint. */
const ALLOWED_HOSTS = new Set([
  'www.onenationagency.com',
  'onenationagency.com',
  'localhost:4321',
  'localhost:3000',
  '127.0.0.1:4321',
]);

/** Longueur maximale acceptée par champ. */
const LIMITS = {
  firstName: 80,
  lastName: 80,
  email: 160,
  phone: 40,
  company: 120,
  subject: 150,
  message: 5000,
  agentMessage: 20000,
};

/** Rate limit : nb de requêtes autorisées par IP et par heure. */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = { form: 5, agent: 4 };

// Compteurs en mémoire. Sur Vercel chaque instance a les siens :
// c'est une protection best-effort, suffisante contre un script
// isolé. Pour une garantie stricte, basculer sur Upstash/Redis.
const hits = new Map();

function rateLimit(ip, bucket) {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return true;
  }

  if (entry.count >= MAX_PER_WINDOW[bucket]) return false;
  entry.count += 1;
  return true;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

/** Vrai si la requête provient bien d'une page du site. */
function isAllowedOrigin(req) {
  const raw = req.headers.origin || req.headers.referer;
  if (!raw) return false;
  try {
    return ALLOWED_HOSTS.has(new URL(raw).host);
  } catch {
    return false;
  }
}

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Neutralise tout HTML injecté par le visiteur. */
function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/** Récupère un champ texte : trim + coupe à la longueur max. */
function field(body, name, max) {
  const value = body?.[name];
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/**
 * Champ mono-ligne destiné à l'objet du mail : retire retours-chariot
 * et caractères de contrôle, qui n'ont rien à y faire.
 */
function line(body, name, max) {
  return field(body, name, max)
    .split('')
    .map((ch) => (ch.charCodeAt(0) < 32 || ch.charCodeAt(0) === 127 ? ' ' : ch))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Origine non autorisée.' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return res.status(415).json({ error: 'Content-Type attendu : application/json.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY manquante');
    return res.status(500).json({ error: "Erreur lors de l'envoi. Veuillez réessayer." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const ip = clientIp(req);
  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Requête invalide.' });
  }

  try {
    // ── Notification interne agent IA ────────────────────────
    // Pas de confirmation visiteur. Le sujet est FIXE côté serveur :
    // le client ne peut plus choisir l'objet du mail.
    if (body._type === 'agent_notification') {
      if (!rateLimit(ip, 'agent')) {
        return res.status(429).json({ error: 'Trop de requêtes. Réessayez plus tard.' });
      }

      const message = field(body, 'message', LIMITS.agentMessage);
      if (!message) return res.status(400).json({ error: 'Message vide.' });

      await resend.emails.send({
        from: FROM,
        to: [AGENCY_EMAIL],
        subject: '🤖 Visiteur sans demande formulée — conversation agent IA',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:8px;"><h2 style="color:#C8960C;">Conversation agent IA</h2><pre style="color:#ccc;font-size:13px;line-height:1.7;white-space:pre-wrap;">${esc(message)}</pre><hr style="border:none;border-top:1px solid #222;margin:24px 0 12px;"/><p style="color:#555;font-size:11px;text-align:center;">Envoyé automatiquement par l'agent IA — onenationagency.com</p></div>`,
      });

      return res.status(200).json({ success: true });
    }

    // ── Formulaire de contact public ─────────────────────────

    // Honeypot : champ invisible pour l'humain, rempli par les bots.
    // On répond 200 pour ne pas leur signaler la détection.
    if (field(body, 'website', 200)) {
      return res.status(200).json({ success: true });
    }

    if (!rateLimit(ip, 'form')) {
      return res.status(429).json({ error: 'Trop de messages envoyés. Réessayez dans une heure.' });
    }

    // Champs mono-ligne : nettoyés des caractères de contrôle (ils
    // alimentent l'objet du mail). Seul `message` conserve ses sauts de ligne.
    const firstName = line(body, 'firstName', LIMITS.firstName);
    const lastName = line(body, 'lastName', LIMITS.lastName);
    const email = line(body, 'email', LIMITS.email);
    const phone = line(body, 'phone', LIMITS.phone);
    const company = line(body, 'company', LIMITS.company);
    const subject = line(body, 'subject', LIMITS.subject);
    const message = field(body, 'message', LIMITS.message);

    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Adresse email invalide.' });
    }

    if (body.consent !== true) {
      return res.status(400).json({ error: 'Vous devez accepter la politique de confidentialité.' });
    }

    // Email de notification vers ONE NATION AGENCY
    await resend.emails.send({
      from: FROM,
      to: [AGENCY_EMAIL],
      replyTo: email,
      subject: `[Contact] ${subject} — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #C8960C; font-size: 24px; margin: 0;">ONE NATION AGENCY</h1>
            <p style="color: #888; font-size: 12px; letter-spacing: 0.2em; margin: 4px 0 0;">NOUVEAU MESSAGE DE CONTACT</p>
          </div>
          <hr style="border: none; border-top: 1px solid #C8960C; margin-bottom: 32px;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px; width: 140px;">Prénom</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${esc(firstName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Nom</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${esc(lastName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #C8960C; font-size: 13px;"><a href="mailto:${encodeURIComponent(email)}" style="color: #C8960C;">${esc(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Téléphone</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${esc(phone)}</td></tr>` : ''}
            ${company ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Entreprise</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${esc(company)}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Sujet</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${esc(subject)}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #111; border-left: 3px solid #C8960C; border-radius: 4px;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 12px;">Message</p>
            <p style="color: #fff; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${esc(message)}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #222; margin: 32px 0 16px;" />
          <p style="color: #555; font-size: 11px; text-align: center; margin: 0;">Envoyé depuis onenationagency.com</p>
        </div>
      `,
    });

    // Email de confirmation automatique au client.
    // Le message du visiteur n'est volontairement PAS réaffiché ici :
    // cet email part vers une adresse arbitraire fournie par le
    // client, il ne doit donc jamais transporter de texte libre.
    await resend.emails.send({
      from: FROM,
      to: [email],
      subject: 'Votre message a bien été reçu — ONE NATION AGENCY',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #C8960C; font-size: 24px; margin: 0;">ONE NATION AGENCY</h1>
            <p style="color: #888; font-size: 12px; letter-spacing: 0.2em; margin: 4px 0 0;">COMMUNICATION SUR MESURE</p>
          </div>
          <hr style="border: none; border-top: 1px solid #C8960C; margin-bottom: 32px;" />
          <p style="color: #fff; font-size: 15px; line-height: 1.7;">Bonjour ${esc(firstName)},</p>
          <p style="color: #ccc; font-size: 14px; line-height: 1.7;">Nous avons bien reçu votre message concernant <strong style="color: #C8960C;">${esc(subject)}</strong>.</p>
          <p style="color: #ccc; font-size: 14px; line-height: 1.7;">Notre équipe vous répondra dans les <strong style="color: #fff;">24 heures ouvrées</strong>.</p>
          <p style="color: #ccc; font-size: 14px; line-height: 1.7;">À très bientôt,<br /><strong style="color: #C8960C;">L'équipe ONE NATION AGENCY</strong></p>
          <hr style="border: none; border-top: 1px solid #222; margin: 32px 0 16px;" />
          <p style="color: #555; font-size: 11px; text-align: center; margin: 0;">
            <a href="https://www.onenationagency.com" style="color: #C8960C;">onenationagency.com</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err?.message || 'unknown');
    return res.status(500).json({ error: "Erreur lors de l'envoi. Veuillez réessayer." });
  }
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
