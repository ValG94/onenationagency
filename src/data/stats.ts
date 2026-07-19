// ============================================================
// CHIFFRES CLÉS DE L'AGENCE — SOURCE DE VÉRITÉ UNIQUE
// ============================================================
// Ces valeurs étaient recopiées à la main sur 4 pages (home FR,
// home EN, vision FR, vision EN) et avaient divergé :
//   - vision.astro affichait « 5 » puis animait vers « 8 »
//   - « 12+ » était libellé « Zones géographiques » en FR et
//     « Countries » en EN
//   - le portfolio comptait ses pays tout seul, sans lien avec la home
//
// Tout part maintenant d'ici. Les libellés sont bilingues, donc FR
// et EN ne peuvent plus se contredire.
// ============================================================

import { portfolioStats } from './projects';
import type { Lang } from './projects';

/** Année de création de l'agence — les années d'expertise s'en déduisent. */
export const FOUNDED_YEAR = 2024;

/** Taux de satisfaction affiché. */
export const SATISFACTION_RATE = 100;

/**
 * Années d'activité, recalculées à chaque build.
 * Décompte inclusif : 2024, 2025 et 2026 comptent pour 3 années.
 * Le compteur passera donc à 4 en janvier 2027, sans intervention.
 */
export const yearsOfExperience = new Date().getFullYear() - FOUNDED_YEAR + 1;

/**
 * Projets livrés = nombre de projets du portfolio.
 * Ajouter un projet dans projects.ts incrémente ce compteur tout seul.
 */
export const PROJECTS_DELIVERED = portfolioStats.projects;

export interface KeyFigure {
  /** Valeur numérique animée par le compteur */
  value: number;
  prefix: string;
  suffix: string;
  label: { fr: string; en: string };
  /** Libellé court, pour la barre de stats de la home */
  shortLabel: { fr: string; en: string };
}

export const keyFigures: KeyFigure[] = [
  {
    value: PROJECTS_DELIVERED,
    // Pas de « + » : le chiffre correspond exactement au portfolio.
    prefix: '',
    suffix: '',
    label: { fr: 'Projets livrés', en: 'Strategic projects delivered' },
    shortLabel: { fr: 'Projets livrés', en: 'Projects delivered' },
  },
  {
    // Aligné sur le compteur du portfolio : une seule définition du
    // nombre de pays pour tout le site.
    value: portfolioStats.countries,
    prefix: '',
    // Pas de « + » : la liste de pays est exhaustive (voir projects.ts).
    suffix: '',
    label: {
      fr: 'Pays couverts (Afrique, Europe, Caraïbes, Moyen-Orient)',
      en: 'Countries covered (Africa, Europe, Caribbean, Middle East)',
    },
    shortLabel: { fr: 'Pays couverts', en: 'Countries covered' },
  },
  {
    value: yearsOfExperience,
    prefix: '',
    suffix: '',
    label: {
      fr: "Années d'expertise institutionnelle",
      en: 'Years of institutional expertise',
    },
    shortLabel: { fr: "Années d'expertise", en: 'Years of expertise' },
  },
  {
    value: SATISFACTION_RATE,
    prefix: '',
    suffix: '%',
    label: { fr: 'Clients satisfaits et fidélisés', en: 'Satisfied and loyal clients' },
    shortLabel: { fr: 'Clients satisfaits', en: 'Satisfied clients' },
  },
];

/** Valeur telle qu'affichée avant animation ("+50", "16+", "100%"). */
export function formatFigure(figure: KeyFigure): string {
  return `${figure.prefix}${figure.value}${figure.suffix}`;
}

/** Chiffres prêts à afficher dans une langue donnée. */
export function getKeyFigures(lang: Lang) {
  return keyFigures.map((figure) => ({
    ...figure,
    text: formatFigure(figure),
    label: figure.label[lang],
    shortLabel: figure.shortLabel[lang],
  }));
}
