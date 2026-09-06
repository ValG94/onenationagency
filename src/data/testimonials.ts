// ============================================================
// TÉMOIGNAGES CLIENTS — SOURCE DE VÉRITÉ UNIQUE
// ============================================================
// Avis Google reçus, saisis à la main. Les composants n'écrivent
// aucun texte de témoignage : ils lisent ce fichier.
//
// RÈGLES à ne pas contourner :
//   - ne jamais inventer ni reformuler un avis ; `fullReview` est le
//     texte reçu, `shortReview` un extrait éditorialisé validé ;
//   - ne jamais afficher de note moyenne Google calculée ici ;
//   - `institutional` signale un avis mobilisable dans l'univers
//     One Nation Civic. Il NE désigne PAS un client ONC : voir
//     l'avertissement sur Alexis Mohamed plus bas.
//
// MIGRATION FUTURE vers une administration des avis : remplacer le
// tableau `testimonials` par un chargement distant. Les sélecteurs
// (`getFeaturedTestimonials`, `getTestimonialForProject`,
// `getInstitutionalTestimonials`) forment le contrat avec l'interface
// et n'auront pas à changer.
// ============================================================

/** Lien de DÉPÔT d'avis. Ne convient pas pour « voir tous les avis ». */
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CaOGSMWQtdkEEBM/review';

/**
 * URL publique de la fiche Google Business, pour un futur
 * « Voir tous les avis ». Tant qu'elle vaut null, le lien n'est pas rendu.
 */
export const GOOGLE_BUSINESS_URL: string | null = null;

export type TestimonialSource = 'Google';

export interface I18nString {
  fr: string;
  en: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  /** Nom du projet, affiché sous le client. */
  projectName: string;
  /** Ligne de contexte : secteur et nature de la mission. */
  category?: I18nString;
  /** Note sur 5, telle que laissée par le client. */
  rating: number;
  source: TestimonialSource;
  /** Extrait affiché sur l'accueil. */
  shortReview: I18nString;
  /** Avis intégral, affiché dans les études de cas. */
  fullReview: I18nString;
  /** Projet rattaché, correspond à un `id` de `projects.ts`. */
  projectId?: string;
  /** Plusieurs projets quand l'avis couvre un écosystème. */
  projectIds?: string[];
  /** Destination du CTA, en chemin FR. La version EN est dérivée. */
  projectUrl?: string;
  /** Libellé du CTA de la carte d'accueil. */
  ctaLabel?: I18nString;
  /** Fichier dans `src/assets/`. Absent : initiales sur pastille. */
  avatar?: string;
  /** Visible sur l'accueil. */
  featured: boolean;
  /** Mobilisable dans l'univers institutionnel. Voir l'avertissement. */
  institutional?: boolean;
  /** Dépublication sans suppression, pour la future administration. */
  published: boolean;
  /** Ordre d'affichage croissant. */
  order: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 'sonia-petrilli',
    clientName: 'Sonia Petrilli',
    projectName: 'Island Living SXM',
    category: {
      fr: 'Hospitality · Site et réservation en ligne',
      en: 'Hospitality · Website and online booking',
    },
    rating: 5,
    source: 'Google',
    shortReview: {
      fr: "Disponible, professionnelle et attentionnée du début à la fin. Un accompagnement impeccable et un site web que j'adore.",
      en: 'Available, professional and attentive from start to finish. Impeccable support and a website I love.',
    },
    fullReview: {
      fr: "Valérie a été exceptionnelle, toujours disponible, professionnelle et attentionnée. Je me suis senti soutenu du début à la fin, avec un service impeccable. J'adore mon nouveau site web. Je la recommande sans hésiter. Merci infiniment, Valérie.",
      en: 'Valérie was exceptional, always available, professional and attentive. I felt supported from start to finish, with impeccable service. I love my new website. I recommend her without hesitation. Thank you so much, Valérie.',
    },
    projectId: 'island-living-sxm',
    projectUrl: '/portfolio#island-living-sxm',
    ctaLabel: {
      fr: 'Découvrir Island Living SXM',
      en: 'Discover Island Living SXM',
    },
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 'constantin-etot',
    clientName: 'Constantin Etot',
    projectName: 'PaieCashFan & PaieCashCoin',
    category: {
      fr: 'SportTech · FinTech · Écosystème digital',
      en: 'SportTech · FinTech · Digital ecosystem',
    },
    rating: 5,
    source: 'Google',
    shortReview: {
      fr: "One Nation a transformé une vision ambitieuse en un véritable écosystème digital. Une équipe réactive, impliquée, capable de comprendre des projets complexes et d'aller bien au-delà du simple développement technique.",
      en: 'One Nation turned an ambitious vision into a genuine digital ecosystem. A responsive, committed team, able to grasp complex projects and to go well beyond technical development alone.',
    },
    fullReview: {
      fr: "Je recommande vivement One Nation pour la qualité de son accompagnement, son professionnalisme et surtout sa capacité à transformer une vision ambitieuse en solutions digitales concrètes.\n\nOne Nation a développé l'ensemble de mes sites et plateformes, en comprenant parfaitement les enjeux de mon projet et son ambition internationale. Ce que j'ai particulièrement apprécié, c'est leur capacité à écouter, proposer des solutions, s'adapter aux évolutions du projet et aller au-delà du simple développement technique.\n\nIls ont su m'accompagner sur des projets complexes liés au sport, au paiement digital, à l'expérience fan, à l'innovation et à l'Afrique, avec une vraie volonté de construire des solutions modernes, évolutives et adaptées à une vision internationale.\n\nAu-delà de leurs compétences techniques, j'ai trouvé chez One Nation une équipe réactive, impliquée et disponible, avec laquelle il est possible de construire dans la durée.\n\nPour moi, One Nation n'est pas simplement un prestataire web : c'est un véritable partenaire technologique qui a contribué à donner vie à ma vision.\n\nUn grand merci à toute l'équipe pour le travail réalisé et pour leur engagement. Je recommande One Nation sans hésitation à toute entreprise ou entrepreneur qui recherche une équipe capable de transformer une idée ambitieuse en un véritable écosystème digital.",
      en: 'I highly recommend One Nation for the quality of their support, their professionalism and above all their ability to turn an ambitious vision into concrete digital solutions.\n\nOne Nation developed all of my sites and platforms, fully understanding what was at stake in my project and its international ambition. What I particularly appreciated was their ability to listen, to propose solutions, to adapt as the project evolved and to go beyond technical development alone.\n\nThey supported me on complex projects covering sport, digital payment, the fan experience, innovation and Africa, with a real determination to build modern, scalable solutions suited to an international vision.\n\nBeyond their technical skills, I found at One Nation a responsive, committed and available team, with whom it is possible to build over the long term.\n\nFor me, One Nation is not simply a web contractor: it is a genuine technology partner that helped bring my vision to life.\n\nMany thanks to the whole team for the work accomplished and for their commitment. I recommend One Nation without hesitation to any company or entrepreneur looking for a team able to turn an ambitious idea into a genuine digital ecosystem.',
    },
    projectIds: ['paiecashfan', 'paiecashcoin'],
    projectUrl: '/portfolio#paiecashfan',
    ctaLabel: {
      fr: "Découvrir l'écosystème PaieCash",
      en: 'Discover the PaieCash ecosystem',
    },
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: 'alexis-mohamed',
    clientName: 'Alexis Mohamed',
    projectName: 'Alexis Mohamed',
    category: {
      fr: 'Institutionnel · Innovation digitale',
      en: 'Institutional · Digital innovation',
    },
    rating: 5,
    source: 'Google',
    shortReview: {
      fr: 'Innovation, professionnalisme et disponibilité : One Nation Agency propose des outils qui répondent aux attentes, notamment auprès des chancelleries.',
      en: 'Innovation, professionalism and availability: One Nation Agency offers tools that meet expectations, notably among chancelleries.',
    },
    fullReview: {
      fr: "Je recommande absolument One Nation Agency dont l'innovation et les outils proposés répondent aux attentes, notamment auprès des chancelleries. Merci à sa directrice pour sa dynamique, son professionnalisme et sa disponibilité.",
      en: 'I absolutely recommend One Nation Agency, whose innovation and the tools it offers meet expectations, notably among chancelleries. Thanks to its director for her drive, her professionalism and her availability.',
    },
    projectId: 'alexis-mohamed',
    projectUrl: '/portfolio#alexis-mohamed',
    ctaLabel: {
      fr: 'Découvrir le projet Alexis Mohamed',
      en: 'Discover the Alexis Mohamed project',
    },
    featured: true,
    // ATTENTION — mobilisable dans l'univers One Nation Civic parce que
    // l'avis mentionne les chancelleries. Alexis Mohamed n'est PAS client
    // d'ONC. Toute reprise doit être introduite par une formule du type
    // « Un regard sur notre approche institutionnelle », JAMAIS par
    // « Client One Nation Civic » ni « Utilisateur One Nation Civic ».
    institutional: true,
    published: true,
    order: 3,
  },
];

/** Initiales pour la pastille, quand aucune photo n'est fournie. */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((mot) => mot[0].toUpperCase())
    .join('');
}

/** Chemin du CTA dans la langue de la page. */
export function localiseTestimonialUrl(
  url: string | undefined,
  lang: string
): string | undefined {
  if (!url) return undefined;
  return lang === 'en' ? `/en${url}` : url;
}

/** Avis mis en avant sur l'accueil, publiés, dans l'ordre voulu. */
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials
    .filter((t) => t.published && t.featured)
    .sort((a, b) => a.order - b.order);
}

/** Avis rattaché à un projet, pour l'affichage en étude de cas. */
export function getTestimonialForProject(projectId: string): Testimonial | undefined {
  return testimonials.find(
    (t) => t.published && (t.projectId === projectId || t.projectIds?.includes(projectId))
  );
}

/**
 * Avis mobilisables dans l'univers institutionnel.
 * Rappel : `institutional` ne désigne jamais un client One Nation Civic.
 */
export function getInstitutionalTestimonials(): Testimonial[] {
  return testimonials
    .filter((t) => t.published && t.institutional)
    .sort((a, b) => a.order - b.order);
}
