// ============================================================
// DÉTECTION DES SOUMISSIONS AUTOMATIQUES
// ------------------------------------------------------------
// Le honeypot et le contrôle d'origine n'arrêtent que les robots
// naïfs : un bot qui exécute du JS pose un Referer valide, coche
// le consentement et laisse le champ piège vide. Ce module juge
// donc le CONTENU, qui lui reste caractéristique.
//
// Principe : un score, pas une règle unique. Aucun signal ne
// bloque à lui seul, ce qui évite d'éconduire un vrai visiteur
// dont le message serait juste inhabituel.
//
// Préfixe « _ » : Vercel n'expose pas ce fichier comme endpoint.
// ============================================================

/** Au-delà de ce score, la soumission est traitée comme un robot. */
export const SPAM_THRESHOLD = 4;

const VOYELLES = /[aeiouyàâäéèêëîïôöùûü]/gi;

/** Part de voyelles dans une chaîne. Un texte humain tourne autour de 0,4. */
function ratioVoyelles(texte) {
  const lettres = texte.replace(/[^a-zà-ÿ]/gi, '');
  if (lettres.length === 0) return 1;
  return (lettres.match(VOYELLES) || []).length / lettres.length;
}

/** Le plus long mot de la chaîne. */
function motLePlusLong(texte) {
  return texte.split(/\s+/).reduce((max, mot) => Math.max(max, mot.length), 0);
}

/**
 * Évalue une soumission de formulaire.
 * Retourne { score, motifs } — `motifs` sert uniquement aux logs.
 */
export function scoreSpam({ firstName = '', lastName = '', message = '', elapsedMs }) {
  let score = 0;
  const motifs = [];

  const ajoute = (points, motif) => {
    score += points;
    motifs.push(motif);
  };

  // ── Noms ────────────────────────────────────────────────
  // Un prénom ou un nom ne contient pas de chiffre. C'est la
  // signature la plus fiable des générateurs aléatoires.
  for (const [libelle, valeur] of [['prénom', firstName], ['nom', lastName]]) {
    if (/\d/.test(valeur)) ajoute(2, `chiffre dans le ${libelle}`);
    else if (valeur.length >= 6 && ratioVoyelles(valeur) < 0.2) {
      ajoute(2, `${libelle} sans voyelles`);
    }
  }

  // ── Message ─────────────────────────────────────────────
  const messageCompact = message.trim();

  // Un bloc unique de 25 caractères sans le moindre espace n'est
  // pas une phrase. C'est le cas typique du spam observé.
  if (messageCompact.length >= 25 && !/\s/.test(messageCompact)) {
    ajoute(3, 'message en un seul bloc sans espace');
  } else if (motLePlusLong(messageCompact) >= 30) {
    ajoute(3, 'mot de plus de 30 caractères');
  }

  if (messageCompact.length >= 20 && ratioVoyelles(messageCompact) < 0.25) {
    ajoute(2, 'message pauvre en voyelles');
  }

  // Le spam de référencement empile les liens.
  const liens = (messageCompact.match(/https?:\/\//gi) || []).length;
  if (liens >= 3) ajoute(2, `${liens} liens dans le message`);

  // ── Vitesse de soumission ───────────────────────────────
  // Un humain met plusieurs secondes à remplir six champs.
  // Signal faible : il ne bloque jamais à lui seul, et une
  // valeur absente ne pénalise pas (formulaire sans JS).
  if (typeof elapsedMs === 'number' && elapsedMs >= 0 && elapsedMs < 3000) {
    ajoute(1, `formulaire soumis en ${elapsedMs} ms`);
  }

  return { score, motifs };
}

/**
 * Vérifie le jeton Cloudflare Turnstile.
 * Tant que `TURNSTILE_SECRET_KEY` n'est pas définie, la vérification
 * est ignorée : le formulaire continue de fonctionner normalement,
 * et la protection s'active d'elle-même le jour où la clé est posée.
 */
export async function verifieTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { actif: false, valide: true };

  if (!token) return { actif: true, valide: false, raison: 'jeton absent' };

  try {
    const reponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = await reponse.json();
    return {
      actif: true,
      valide: data.success === true,
      raison: data['error-codes']?.join(', '),
    };
  } catch (err) {
    // Cloudflare injoignable : on laisse passer plutôt que de
    // bloquer de vrais visiteurs. Les filtres de contenu restent.
    console.error('Turnstile injoignable :', err?.message || 'inconnu');
    return { actif: true, valide: true, raison: 'service injoignable' };
  }
}
