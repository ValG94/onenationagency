// ============================================================
// PROJETS PORTFOLIO — SOURCE DE VÉRITÉ UNIQUE (FR + EN)
// ============================================================
// POUR AJOUTER UN PROJET :
//   1. Placer l'image dans src/assets/
//   2. Ajouter une entrée en TÊTE du tableau `projects` (index 0)
//   3. C'EST TOUT.
//      → le numéro affiché (08, 07, 06...) est calculé automatiquement
//      → le compteur "PROJETS" du hero est calculé automatiquement
//      → le compteur "PAYS" est calculé depuis le champ `countries`
//      → le compteur "EXPERTISES" est calculé depuis le champ `expertise`
//      → les versions FR et EN de la page portfolio se mettent à jour ensemble
// ============================================================

// Les images vivent dans src/assets/ : Astro les optimise au build
// (WebP + plusieurs tailles + width/height automatiques).
// Ce glob les charge toutes ; un nom de fichier erroné casse le build
// au lieu de produire une image 404 en production.
const assetModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

function asset(file: string): ImageMetadata {
  const mod = assetModules[`../assets/${file}`];
  if (!mod) {
    throw new Error(
      `Image introuvable dans src/assets/ : "${file}". ` +
        `Fichiers disponibles : ${Object.keys(assetModules).map((k) => k.replace('../assets/', '')).join(', ')}`
    );
  }
  return mod.default;
}

export type Lang = 'fr' | 'en';

/** Texte disponible dans les deux langues */
export interface I18nText {
  fr: string;
  en: string;
}

/** Les 3 grands pôles d'expertise de l'agence (sert au compteur "Expertises") */
export type Expertise = 'strategie' | 'digital' | 'ia';

export interface Project {
  /** Identifiant unique (slug) — sert de clé, pas d'affichage */
  id: string;
  /** Titre (identique FR/EN dans la plupart des cas) */
  title: string;
  /** Accroche sous le titre */
  subtitle: I18nText;
  /** Catégorie affichée à côté du pays */
  category: I18nText;
  /** Libellé pays affiché (peut être « FRANCE / AFRIQUE », « INTERNATIONAL »...) */
  countryLabel: I18nText;
  /** Pays réellement couverts — utilisé UNIQUEMENT pour le compteur « Pays » */
  countries: string[];
  /** Pôle d'expertise principal — utilisé pour le compteur « Expertises » */
  expertise: Expertise;
  /** Description longue */
  description: I18nText;
  /** Tags affichés sous la description */
  tags: { fr: string[]; en: string[] };
  /** Visuel du portfolio (mockup) — nom du fichier dans src/assets/ */
  image: string;
  /** object-position CSS optionnel */
  imagePosition?: string;
  /** Vignette de la home. Par défaut : `image`. */
  homeImage?: string;
  /** object-position CSS de la vignette home */
  homeImagePosition?: string;
  /** URL du projet en ligne — omettre pour un projet confidentiel */
  link?: string;
  /** Couleur de fond du bloc visuel */
  color: string;
}

// ── Ajouter les nouveaux projets ICI, en tête de tableau ──
export const projects: Project[] = [
  {
    id: 'island-living-sxm',
    title: 'Island Living SXM',
    subtitle: {
      fr: 'Expérience digitale premium et réservation directe à Sint Maarten',
      en: 'Premium digital experience and direct booking in Sint Maarten',
    },
    category: { fr: 'Digital & E-commerce', en: 'Digital & E-commerce' },
    countryLabel: { fr: 'Sint Maarten', en: 'Sint Maarten' },
    countries: ['Sint Maarten'],
    expertise: 'digital',
    description: {
      fr: "Création d'une plateforme bilingue de réservation directe pour deux villas de luxe à Sint Maarten. Le projet associe une expérience UX/UI premium, un moteur de réservation, la synchronisation des calendriers, un guide digital interactif, un back-office complet et l'intégration de Fygaro pour sécuriser les paiements dans un contexte bancaire caribéen complexe.",
      en: 'Creation of a bilingual direct-booking platform for two luxury villas in Sint Maarten. The project combines a premium UX/UI experience, a booking engine, calendar synchronisation, an interactive digital guide, a full back-office and Fygaro integration to secure payments in a complex Caribbean banking context.',
    },
    tags: {
      fr: ['Web Institutionnel', 'Design', 'Branding'],
      en: ['Institutional Web', 'Design', 'Branding'],
    },
    image: 'islandlivingsxm-tablet.jpg',
    link: 'https://www.islandlivingsxm.com/en',
    color: '#0D1B2A',
  },
  {
    id: 'centrachat',
    title: 'Centrachat Africa',
    subtitle: {
      fr: "Première centrale d'achats panafricaine",
      en: 'First pan-African purchasing centre',
    },
    category: { fr: 'Digital & Stratégie', en: 'Digital & Strategy' },
    countryLabel: { fr: 'CAMEROUN', en: 'CAMEROON' },
    countries: ['Cameroun'],
    expertise: 'digital',
    description: {
      fr: "Création de la plateforme digitale de la première centrale d'achats panafricaine basée à Yaoundé. Site bilingue, système d'adhésion en ligne, identité de marque complète.",
      en: 'Creation of the digital platform for the first pan-African purchasing centre based in Yaoundé. Bilingual site, online membership system, complete brand identity.',
    },
    tags: {
      fr: ['Web Premium', 'Stratégie', 'Branding'],
      en: ['Premium Web', 'Strategy', 'Branding'],
    },
    image: 'centrachat_tablet.jpg',
    homeImage: 'centrachat_home.webp',
    link: 'https://www.centrachat.africa',
    color: '#1a3a5c',
  },
  {
    id: 'afac26',
    title: 'AFAC26 Conference',
    subtitle: {
      fr: 'Site trilingue, agent IA et paiement international',
      en: 'Trilingual site, AI agent & international payment',
    },
    category: { fr: 'Intelligence Artificielle', en: 'Artificial Intelligence' },
    countryLabel: { fr: 'INTERNATIONAL', en: 'INTERNATIONAL' },
    countries: ['France'],
    expertise: 'ia',
    description: {
      fr: "Conception et développement du site officiel de l'African Football Agents Conference 2026. Plateforme trilingue (FR/EN/PT), agent IA intégré, système de paiement international et accréditation.",
      en: 'Design and development of the official website for the African Football Agents Conference 2026. Trilingual platform (FR/EN/PT), integrated AI agent, international payment system and accreditation.',
    },
    tags: {
      fr: ['Agent IA', 'Web Trilingue', 'Paiement'],
      en: ['AI Agent', 'Trilingual Web', 'Payment'],
    },
    image: 'afac26_board.jpg',
    homeImage: 'Afac26_home.jpg',
    link: 'https://www.afaaconference.com/en',
    color: '#0d1b2a',
  },
  {
    id: 'alexis-mohamed',
    title: 'Alexis Mohamed — Djibouti',
    subtitle: {
      fr: 'Campagne présidentielle 2026',
      en: '2026 Presidential campaign',
    },
    category: { fr: 'Communication 360', en: '360° Communication' },
    countryLabel: { fr: 'DJIBOUTI', en: 'DJIBOUTI' },
    countries: ['Djibouti'],
    expertise: 'strategie',
    description: {
      fr: "Stratégie de communication complète pour la campagne présidentielle 2026 d'Alexis Mohamed. Identité visuelle, site officiel, gestion des réseaux sociaux et relations presse.",
      en: 'Complete communication strategy for the 2026 presidential campaign of Alexis Mohamed. Visual identity, official website, social media management and press relations.',
    },
    tags: {
      fr: ['Communication Politique', 'Web', 'Réseaux Sociaux'],
      en: ['Political Communication', 'Web', 'Social Media'],
    },
    image: 'homeMohamed_laptop.webp',
    homeImage: 'homeMohamed.jpg',
    homeImagePosition: 'top',
    imagePosition: '70% center',
    link: 'https://www.alexis-mohamed.com',
    color: '#1c3a5e',
  },
  {
    id: 'paiecashplay',
    title: 'PaieCashPlay',
    subtitle: {
      fr: 'Solutions digitales pour les associations sportives',
      en: 'Digital solutions for sports associations',
    },
    category: {
      fr: 'Fintech & Intelligence Artificielle',
      en: 'Fintech & Artificial Intelligence',
    },
    countryLabel: { fr: 'FRANCE / AFRIQUE', en: 'FRANCE / AFRICA' },
    countries: ['France'],
    expertise: 'ia',
    description: {
      fr: "Conception et développement de l'écosystème digital PaieCashPlay : paiements digitaux, e-commerce, streaming, agent IA et digitalisation des clubs sportifs.",
      en: 'Design and development of the PaieCashPlay digital ecosystem: digital payments, e-commerce, streaming, AI agent and digitalisation of sports clubs.',
    },
    tags: {
      fr: ['Fintech', 'Agent IA', 'App Mobile'],
      en: ['Fintech', 'AI Agent', 'Mobile App'],
    },
    image: 'paiecashplay_phone.jpg',
    link: 'https://www.paiecashplay.com',
    color: '#1a1a2e',
  },
  {
    id: 'djorie',
    title: 'Dr Serge Ghislain Djorie',
    subtitle: {
      fr: 'Campagne présidentielle 2025 — Centrafrique',
      en: '2025 Presidential campaign — Central African Republic',
    },
    category: { fr: 'Communication 360', en: '360° Communication' },
    countryLabel: { fr: 'CENTRAFRIQUE', en: 'CENTRAL AFRICAN REPUBLIC' },
    countries: ['Centrafrique'],
    expertise: 'strategie',
    description: {
      fr: 'Direction de la communication pour la campagne présidentielle 2025 en Centrafrique. Stratégie digitale, site officiel, production de contenus et coordination médias.',
      en: 'Communication direction for the 2025 presidential campaign in the Central African Republic. Digital strategy, official website, content production and media coordination.',
    },
    tags: {
      fr: ['Communication Politique', 'Stratégie', 'Médias'],
      en: ['Political Communication', 'Strategy', 'Media'],
    },
    image: 'djorie_board.jpg',
    homeImage: 'homeDjorie.jpg',
    homeImagePosition: 'top',
    link: 'https://www.djorie2025.cf',
    color: '#1a0a2e',
  },
  {
    id: 'nomadeo',
    title: 'Nomadéo Africa',
    subtitle: {
      fr: 'Refonte site e-commerce mobilier de bureau',
      en: 'E-commerce website redesign — office furniture',
    },
    category: { fr: 'Digital', en: 'Digital' },
    countryLabel: { fr: 'CAMEROUN', en: 'CAMEROON' },
    countries: ['Cameroun'],
    expertise: 'digital',
    description: {
      fr: 'Refonte complète du site e-commerce de Nomadéo Africa, leader du mobilier de bureau au Cameroun. UX/UI premium, catalogue produits, SEO et intégration paiement.',
      en: 'Complete redesign of the Nomadéo Africa e-commerce site, leader in office furniture in Cameroon. Premium UX/UI, product catalogue, SEO and payment integration.',
    },
    tags: {
      fr: ['E-commerce', 'UX/UI', 'SEO'],
      en: ['E-commerce', 'UX/UI', 'SEO'],
    },
    image: 'nomadeo_tablet.jpg',
    homeImage: 'nomadeo-africa-home.jpg',
    link: 'https://nomadeo.africa/',
    color: '#1a2a1a',
  },
  {
    id: 'coplacam',
    title: 'Coplacam',
    subtitle: {
      fr: 'Refonte site institutionnel Design & Build',
      en: 'Institutional website redesign — Design & Build',
    },
    category: { fr: 'Digital', en: 'Digital' },
    countryLabel: { fr: 'CAMEROUN', en: 'CAMEROON' },
    countries: ['Cameroun'],
    expertise: 'digital',
    description: {
      fr: "Refonte du site institutionnel de Coplacam Design & Build, acteur majeur de l'agencement sur mesure en Afrique centrale. Identité visuelle renforcée et expérience utilisateur premium.",
      en: 'Redesign of the institutional website for Coplacam Design & Build, a major player in bespoke interior design in Central Africa. Strengthened visual identity and premium user experience.',
    },
    tags: {
      fr: ['Web Institutionnel', 'Design', 'Branding'],
      en: ['Institutional Web', 'Design', 'Branding'],
    },
    image: 'coplacam_laptop.webp',
    link: 'https://www.coplacam.com',
    color: '#2a1a0a',
  },
];

// ============================================================
// PAYS SUPPLÉMENTAIRES
// ------------------------------------------------------------
// Pays où l'agence est intervenue sans projet public dans le
// portfolio. Ils s'ajoutent au compteur « Pays » sans doublon.
// ============================================================
export const additionalCountries: string[] = [
  'Canada',
  'Cap-Vert',
];

// ============================================================
// DÉRIVÉS AUTOMATIQUES — ne rien modifier en dessous
// ============================================================

/** Vue d'un projet prête à afficher dans une langue donnée. */
export interface LocalizedProject {
  id: string;
  /** Numéro affiché ("08", "07"...) — calculé, jamais saisi à la main */
  number: string;
  title: string;
  subtitle: string;
  category: string;
  country: string;
  description: string;
  tags: string[];
  /** Image prête pour <Image /> d'astro:assets (dimensions incluses) */
  image: ImageMetadata;
  imagePosition?: string;
  /** Vignette pour la home (retombe sur `image` si non définie) */
  homeImage: ImageMetadata;
  homeImagePosition?: string;
  link?: string;
  color: string;
}

/** Projets localisés, du plus récent au plus ancien, numérotés automatiquement. */
export function getProjects(lang: Lang): LocalizedProject[] {
  const total = projects.length;
  return projects.map((p, i) => ({
    id: p.id,
    number: String(total - i).padStart(2, '0'),
    title: p.title,
    subtitle: p.subtitle[lang],
    category: p.category[lang],
    country: p.countryLabel[lang],
    description: p.description[lang],
    tags: p.tags[lang],
    image: asset(p.image),
    imagePosition: p.imagePosition,
    homeImage: asset(p.homeImage ?? p.image),
    homeImagePosition: p.homeImagePosition,
    link: p.link,
    color: p.color,
  }));
}

const uniqueCountries = new Set<string>([
  ...projects.flatMap((p) => p.countries),
  ...additionalCountries,
]);

const uniqueExpertises = new Set<Expertise>(projects.map((p) => p.expertise));

/** Chiffres du hero portfolio — 100 % calculés depuis `projects`. */
export const portfolioStats = {
  projects: projects.length,
  countries: uniqueCountries.size,
  expertises: uniqueExpertises.size,
} as const;

/** Formate un nombre sur 2 chiffres ("8" → "08"). */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** Les N projets les plus récents (pour la home). */
export function getLatestProjects(count = 3, lang: Lang = 'fr'): LocalizedProject[] {
  return getProjects(lang).slice(0, count);
}
