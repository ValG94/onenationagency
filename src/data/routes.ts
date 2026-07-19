// ============================================================
// CORRESPONDANCE DES PAGES FR <-> EN — SOURCE DE VÉRITÉ UNIQUE
// ============================================================
// Utilisée par :
//   - Header.astro   (sélecteur de langue)
//   - Footer.astro   (liens de navigation)
//   - Layout.astro   (balises hreflang)
//
// Seules les pages listées ici existent dans les deux langues.
// Les pages FR absentes de cette table (mentions légales, pages
// service, témoignages...) n'émettent donc PAS de hreflang "en"
// vers une URL inexistante.
//
// POUR TRADUIRE UNE NOUVELLE PAGE :
//   1. Créer le fichier dans src/pages/en/
//   2. Ajouter la paire ci-dessous — le sélecteur de langue et les
//      hreflang se mettent à jour tout seuls.
// ============================================================

export interface LocalePair {
  fr: string;
  en: string;
}

export const localePairs: LocalePair[] = [
  { fr: '/', en: '/en' },
  { fr: '/vision', en: '/en/vision' },
  { fr: '/services', en: '/en/services' },
  { fr: '/portfolio', en: '/en/portfolio' },
  { fr: '/intelligence-artificielle', en: '/en/artificial-intelligence' },
  { fr: '/contact', en: '/en/contact' },
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

/** Vrai si la page existe dans les deux langues. */
export function hasTranslation(path: string): boolean {
  const current = normalisePath(path);
  return localePairs.some(
    (p) => normalisePath(p.fr) === current || normalisePath(p.en) === current
  );
}
