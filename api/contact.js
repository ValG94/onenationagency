import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { firstName, lastName, email, phone, company, subject, message, consent } = req.body;

    // Validation serveur
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }

    if (!consent) {
      return res.status(400).json({ error: 'Vous devez accepter la politique de confidentialité.' });
    }

    // Email de notification vers ONE NATION AGENCY
    await resend.emails.send({
      from: 'ONE NATION AGENCY <onboarding@resend.dev>',
      to: ['contact@onenationagency.com'],
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
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px; width: 140px;">Prénom</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${firstName}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Nom</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #C8960C; font-size: 13px;"><a href="mailto:${email}" style="color: #C8960C;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Téléphone</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${phone}</td></tr>` : ''}
            ${company ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Entreprise</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${company}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Sujet</td><td style="padding: 8px 0; color: #fff; font-size: 13px;">${subject}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #111; border-left: 3px solid #C8960C; border-radius: 4px;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 12px;">Message</p>
            <p style="color: #fff; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #222; margin: 32px 0 16px;" />
          <p style="color: #555; font-size: 11px; text-align: center; margin: 0;">Envoyé depuis onenationagency.com</p>
        </div>
      `,
    });

    // Email de confirmation automatique au client
    await resend.emails.send({
      from: 'ONE NATION AGENCY <onboarding@resend.dev>',
      to: [email],
      subject: `Votre message a bien été reçu — ONE NATION AGENCY`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #C8960C; font-size: 24px; margin: 0;">ONE NATION AGENCY</h1>
            <p style="color: #888; font-size: 12px; letter-spacing: 0.2em; margin: 4px 0 0;">COMMUNICATION SUR MESURE</p>
          </div>
          <hr style="border: none; border-top: 1px solid #C8960C; margin-bottom: 32px;" />
          <p style="color: #fff; font-size: 15px; line-height: 1.7;">Bonjour ${firstName},</p>
          <p style="color: #ccc; font-size: 14px; line-height: 1.7;">Nous avons bien reçu votre message concernant <strong style="color: #C8960C;">${subject}</strong>.</p>
          <p style="color: #ccc; font-size: 14px; line-height: 1.7;">Notre équipe vous répondra dans les <strong style="color: #fff;">24 heures ouvrées</strong>.</p>
          <div style="margin: 32px 0; padding: 20px; background: #111; border-left: 3px solid #C8960C; border-radius: 4px;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 8px;">Votre message</p>
            <p style="color: #ccc; font-size: 13px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #ccc; font-size: 14px; line-height: 1.7;">À très bientôt,<br /><strong style="color: #C8960C;">L'équipe ONE NATION AGENCY</strong></p>
          <hr style="border: none; border-top: 1px solid #222; margin: 32px 0 16px;" />
          <p style="color: #555; font-size: 11px; text-align: center; margin: 0;">
            <a href="https://onenationagency.com" style="color: #C8960C;">onenationagency.com</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi. Veuillez réessayer.' });
  }
}
