// ============================================================
// ONE NATION CIVIC — SOURCE DE VÉRITÉ UNIQUE
// ============================================================
// Solution propriétaire développée par One Nation Agency :
// plateforme d'agents IA multilingues pour les institutions et
// les services publics.
//
// Tout le contenu ONC affiché sur le site vit ici, dans les deux
// langues. Utilisé par :
//   - CivicSection.astro (accueils FR/EN, pages IA FR/EN)
//   - Header.astro       (lien de navigation)
//
// NE PAS recopier ces chaînes dans une page : les modifier ici se
// répercute partout, et la parité FR/EN reste garantie par le type.
// ============================================================

/**
 * Site public de la plateforme. Ouvert dans un nouvel onglet.
 * Domaine propre depuis le 25/08/2026 : l'ancienne adresse
 * onenationcivic.onrender.com répond encore mais n'est plus référencée.
 */
export const CIVIC_URL = 'https://onenationcivic.com/';

/** Ancre de la section ONC sur les deux accueils. */
export const CIVIC_ANCHOR = 'one-nation-civic';

/** Chemin du lien de navigation vers la section, depuis n'importe quelle page. */
export function civicHref(lang: string): string {
  return lang === 'en' ? `/en#${CIVIC_ANCHOR}` : `/#${CIVIC_ANCHOR}`;
}

export interface CivicCopy {
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  text: string;
  features: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  philosophy: string;
  newTab: string;
  /** Textes alternatifs des deux captures de la plateforme. */
  shotDesktopAlt: string;
  shotPhoneAlt: string;
  /** Variante « feature » : bloc institutionnel de la page Offres. */
  featureEyebrow: string;
  featureText: string;
  /** Indices de `features` retenus pour cette variante, plus courte. */
  featureIndices: number[];
  /** Variante compacte, affichée sur les pages expertise. */
  compactLead: string;
  compactCta: string;
}

const fr: CivicCopy = {
  navLabel: 'One Nation Civic',
  eyebrow: 'Une solution propriétaire One Nation Agency',
  title: 'ONE NATION CIVIC',
  subtitle: "L'IA au service d'un accueil public plus humain.",
  text: "One Nation Civic est la plateforme d'agents IA multilingues développée par One Nation Agency pour permettre aux institutions et services publics d'informer, orienter et accompagner leurs usagers 24h/24, tout en maintenant l'humain au cœur des situations qui nécessitent expertise et discernement.",
  features: [
    'Information fiable et sourcée 24/7',
    'Prise de rendez-vous en ligne',
    // Trait d'union insécable (U+2011) : sur colonne étroite, le navigateur
    // coupait « e-mail » en fin de ligne.
    'Notifications WhatsApp et e‑mail',
    'Multilingue',
    'Escalade vers un agent humain',
    'Gouvernance et contrôle humain',
  ],
  ctaPrimary: 'Découvrir One Nation Civic',
  ctaSecondary: 'Demander une démonstration',
  philosophy: 'Nous croyons que la technologie doit renforcer le service public, jamais le remplacer.',
  newTab: '(nouvel onglet)',
  shotDesktopAlt: "Page d'accueil de One Nation Civic : l'accueil consulaire numérique pour les ambassades et les consulats.",
  shotPhoneAlt: "L'assistant One Nation Civic sur mobile, répondant à un usager sur les démarches de visa.",
  featureEyebrow: 'Institutions et services publics',
  featureText:
    "Découvrez One Nation Civic, notre plateforme propriétaire d'agents IA multilingues conçue pour moderniser l'accueil numérique des institutions tout en maintenant l'humain au cœur du service.",
  // Information 24/7, prise de rendez-vous, multilingue, escalade humaine.
  featureIndices: [0, 1, 3, 4],
  compactLead: "Notre solution propriétaire d'agents IA pour les institutions et les services publics.",
  compactCta: 'Découvrir ONC',
};

const en: CivicCopy = {
  navLabel: 'One Nation Civic',
  eyebrow: 'A proprietary One Nation Agency solution',
  title: 'ONE NATION CIVIC',
  subtitle: 'AI serving a more human public experience.',
  text: 'One Nation Civic is the multilingual AI agent platform developed by One Nation Agency to help public institutions inform, guide and support users 24/7, while keeping human expertise at the heart of situations that require judgement and personal assistance.',
  features: [
    'Reliable and sourced information 24/7',
    'Online appointment booking',
    'WhatsApp and email notifications',
    'Multilingual support',
    'Escalation to a human agent',
    'Human governance and control',
  ],
  ctaPrimary: 'Discover One Nation Civic',
  ctaSecondary: 'Request a demonstration',
  philosophy: 'We believe technology should strengthen public service, never replace it.',
  newTab: '(opens in a new tab)',
  shotDesktopAlt: 'The One Nation Civic homepage: digital consular reception for embassies and consulates.',
  shotPhoneAlt: 'The One Nation Civic assistant on mobile, answering a user about visa procedures.',
  featureEyebrow: 'Institutions and public services',
  featureText:
    'Discover One Nation Civic, our proprietary multilingual AI agent platform designed to modernize digital public services while keeping people at the heart of the experience.',
  featureIndices: [0, 1, 3, 4],
  compactLead: 'Our proprietary AI agent solution for public institutions and services.',
  compactCta: 'Discover ONC',
};

/** Contenu ONC dans la langue de la page. Retombe sur le français. */
export function getCivicCopy(lang: string): CivicCopy {
  return lang === 'en' ? en : fr;
}
