// ============================================================
// RÉALISATIONS ONE NATION AGENCY — Source de vérité unique
// ============================================================
// Pour ajouter une nouvelle réalisation :
//   1. Ajouter une entrée en TÊTE de tableau (index 0)
//   2. Placer l'image dans /public/
//   3. La home affichera automatiquement les 3 premières entrées
// ============================================================

export interface Realisation {
  /** Identifiant unique (slug) */
  id: string;
  /** Catégorie affichée en doré */
  category: string;
  /** Titre de la réalisation */
  title: string;
  /** Courte description */
  description: string;
  /** Chemin vers l'image (dans /public/) */
  image: string;
  /** Texte alternatif de l'image */
  imageAlt: string;
  /** Position de l'image : 'center' | 'top' | 'bottom' | 'left' | 'right' */
  imagePosition?: string;
  /** URL externe du projet (optionnel) */
  url?: string;
  /** Lien interne vers la page portfolio (optionnel) */
  portfolioSlug?: string;
  /** Tags pour le filtrage sur la page portfolio */
  tags?: string[];
  /** Année de réalisation */
  year?: number;
}

export const realisations: Realisation[] = [
  // ── Ajouter les nouvelles réalisations ICI en tête de tableau ──
  {
    id: "afac26",
    category: "Intelligence Artificielle",
    title: "AFAC26 — Site trilingue, agent IA et solution de paiement",
    description: "Conférence internationale des agents de football africains",
    image: "/Afac26_home.jpg",
    imageAlt: "AFAC26 — Site trilingue et agent IA",
    imagePosition: "center",
    url: "https://afac26.com",
    tags: ["ia", "web", "evenement"],
    year: 2025,
  },
  {
    id: "alexis-mohamed",
    category: "Communication 360",
    title: "Campagne présidentielle 2026 — Alexis Mohamed (Djibouti)",
    description: "Stratégie digitale et communication institutionnelle",
    image: "/homeMohamed.jpg",
    imageAlt: "Campagne présidentielle Alexis Mohamed — Djibouti",
    imagePosition: "top",
    tags: ["communication", "politique", "digital"],
    year: 2026,
  },
  {
    id: "centrachat",
    category: "Digital",
    title: "Centrachat Africa — 1ère centrale d'achats panafricaine",
    description: "Plateforme B2B premium, Yaoundé, Cameroun",
    image: "/centrachat_home.webp",
    imageAlt: "Centrachat Africa — Centrale d'achats panafricaine",
    imagePosition: "center",
    url: "https://www.centrachat.africa",
    tags: ["web", "digital", "b2b"],
    year: 2024,
  },
  {
    id: "nomadeo",
    category: "Digital",
    title: "Nomadeo Africa — Plateforme de voyage panafricaine",
    description: "Expérience digitale immersive pour le tourisme africain",
    image: "/nomadeo africa home.jpg",
    imageAlt: "Nomadeo Africa — Plateforme de voyage",
    imagePosition: "center",
    tags: ["web", "digital", "tourisme"],
    year: 2024,
  },
  {
    id: "djorie",
    category: "Communication Politique",
    title: "Campagne présidentielle — Djorie",
    description: "Site de campagne et stratégie de communication digitale",
    image: "/homeDjorie.jpg",
    imageAlt: "Campagne présidentielle Djorie",
    imagePosition: "top",
    tags: ["communication", "politique", "web"],
    year: 2023,
  },
];

/** Retourne les N dernières réalisations (les premières du tableau) */
export function getLatestRealisations(count: number = 3): Realisation[] {
  return realisations.slice(0, count);
}
