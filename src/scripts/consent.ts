// ============================================================
// CONSENTEMENT COOKIES / TRAITEMENT DE DONNÉES
// ============================================================
// Source de vérité unique du consentement, partagée par la
// bannière (CookieBanner.astro) et par tout ce qui transmet des
// données du visiteur (AIAgent.astro).
//
// Règle : tant que le visiteur n'a pas accepté explicitement,
// AUCUNE donnée de navigation ou de conversation ne quitte le
// navigateur. L'absence de choix vaut refus (RGPD art. 4(11) :
// le consentement doit être un acte positif univoque).
// ============================================================

export const CONSENT_KEY = 'ona_cookie_consent';

/** Événement émis à chaque changement de choix, dans tous les onglets ouverts. */
export const CONSENT_EVENT = 'ona:consent-change';

export type ConsentChoice = 'all' | 'necessary';

/** Choix enregistré, ou `null` si le visiteur ne s'est pas encore prononcé. */
export function getConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'all' || value === 'necessary' ? value : null;
  } catch {
    // localStorage indisponible (mode privé strict) → on considère "pas de choix"
    return null;
  }
}

/**
 * Vrai uniquement si le visiteur a accepté les traitements optionnels.
 * Un visiteur qui n'a rien choisi retourne `false`.
 */
export function hasAnalyticsConsent(): boolean {
  return getConsent() === 'all';
}

/** Enregistre le choix et prévient le reste de la page. */
export function setConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* stockage indisponible : le choix ne survivra pas à la navigation */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

/** Efface le choix — la bannière se réaffichera. */
export function resetConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* rien à faire */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}
