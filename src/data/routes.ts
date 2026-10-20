// ============================================================
// CORRESPONDANCE DES PAGES FR <-> EN — SOURCE DE VÉRITÉ UNIQUE
// ============================================================
// Utilisée par :
//   - Header.astro   (sélecteur de langue)
//   - Footer.astro   (liens de navigation)
//   - Layout.astro   (balises hreflang)
//   - SiteMapContent.astro (plan du site, /plan-du-site et /en/site-map)
//
// Seules les pages listées ici existent dans les deux langues, et
// seules elles figurent au plan du site : une page FR absente de cette
// table n'émet PAS de hreflang "en" vers une URL inexistante.
//
// POUR TRADUIRE UNE NOUVELLE PAGE :
//   1. Créer le fichier dans src/pages/en/
//   2. Ajouter la paire ci-dessous, avec son libellé et sa rubrique :
//      le sélecteur de langue, les hreflang et le plan du site se
//      mettent à jour tout seuls.
// ============================================================

import { CIVIC_ANCHOR } from './civic';

/** Rubrique de la page dans le plan du site. */
export type PageGroup = 'main' | 'legal';

/** Section ancrée d'une page, listée sous elle dans le plan du site. */
export interface PageSection {
  /** Identifiant de l'ancre, sans « # » (id présent dans les deux langues). */
  anchor: string;
  label: { fr: string; en: string };
}

export interface LocalePair {
  fr: string;
  en: string;
  /** Intitulé de la page dans le plan du site, dans chaque langue. */
  label: { fr: string; en: string };
  group: PageGroup;
  /** Sous-parties ancrées affichées sous la page dans le plan du site. */
  sections?: PageSection[];
}

// L'ordre de ce tableau est celui du plan du site (/plan-du-site) : il suit
// celui du menu principal.
//
// Les huit pages d'expertise de la première version du site (afrique,
// conseil-strategique, design-graphique, e-reputation, referencement,
// relations-presse, reseaux-sociaux, webmarketing) ont été retirées le
// 20/10/2026 : archivées dans src/_archive/, redirigées en 301 vers les
// sections de /services (vercel.json). Ne pas les réintroduire ici.
export const localePairs: LocalePair[] = [
  // Pages principales
  {
    fr: '/', en: '/en', label: { fr: 'Accueil', en: 'Home' }, group: 'main',
    sections: [{ anchor: CIVIC_ANCHOR, label: { fr: 'One Nation Civic', en: 'One Nation Civic' } }],
  },
  { fr: '/vision', en: '/en/vision', label: { fr: "L'Agence", en: 'The Agency' }, group: 'main' },
  {
    fr: '/services', en: '/en/services', label: { fr: 'Expertises', en: 'Expertise' }, group: 'main',
    sections: [
      { anchor: 'communication', label: { fr: 'Communication stratégique', en: 'Strategic communication' } },
      { anchor: 'ia', label: { fr: 'Intelligence artificielle', en: 'Artificial intelligence' } },
      { anchor: 'web', label: { fr: 'Création web premium', en: 'Premium web creation' } },
    ],
  },
  { fr: '/portfolio', en: '/en/portfolio', label: { fr: 'Portfolio', en: 'Portfolio' }, group: 'main' },
  { fr: '/intelligence-artificielle', en: '/en/artificial-intelligence', label: { fr: 'Intelligence artificielle', en: 'Artificial intelligence' }, group: 'main' },
  { fr: '/offres', en: '/en/packages', label: { fr: 'Offres et tarifs', en: 'Packages and pricing' }, group: 'main' },
  { fr: '/contact', en: '/en/contact', label: { fr: 'Contact', en: 'Contact' }, group: 'main' },

  // Pages légales et pratiques
  { fr: '/mentions-legales', en: '/en/legal-notice', label: { fr: 'Mentions légales', en: 'Legal notice' }, group: 'legal' },
  { fr: '/politique-confidentialite', en: '/en/privacy-policy', label: { fr: 'Politique de confidentialité', en: 'Privacy policy' }, group: 'legal' },
  { fr: '/politique-cookies', en: '/en/cookie-policy', label: { fr: 'Politique cookies', en: 'Cookie policy' }, group: 'legal' },
  { fr: '/cgv', en: '/en/terms-and-conditions', label: { fr: 'Conditions générales de vente', en: 'Terms and conditions' }, group: 'legal' },
  { fr: '/plan-du-site', en: '/en/site-map', label: { fr: 'Plan du site', en: 'Site map' }, group: 'legal' },
];

/** Retire le slash final ajouté par Astro ("/services/" -> "/services"). */
export function normalisePath(path: string): string {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * Équivalent d'une page dans l'autre langue.
 * Retourne `null` si la page n'est pas traduite — l'appelant décide
 * alors quoi faire (retomber sur l'accueil, ou ne rien émettre).
 */
export function counterpart(path: string, targetLang: 'fr' | 'en'): string | null {
  const current = normalisePath(path);
  const source = targetLang === 'en' ? 'fr' : 'en';
  const pair = localePairs.find((p) => normalisePath(p[source]) === current);
  return pair ? pair[targetLang] : null;
}

/**
 * Chemin d'une page dans la langue demandée, à partir de son chemin FR.
 * Retombe sur le chemin FR si la page n'est pas traduite — utile pour les
 * liens de navigation, qui doivent toujours mener quelque part.
 */
export function localised(frPath: string, lang: string): string {
  if (lang !== 'en') return frPath;
  return counterpart(frPath, 'en') ?? frPath;
}

/** Vrai si la page existe dans les deux langues. */
export function hasTranslation(path: string): boolean {
  const current = normalisePath(path);
  return localePairs.some(
    (p) => normalisePath(p.fr) === current || normalisePath(p.en) === current
  );
}
