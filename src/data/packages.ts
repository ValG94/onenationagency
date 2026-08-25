// ============================================================
// OFFRES PACKAGÉES — SOURCE DE VÉRITÉ UNIQUE
// ============================================================
// Contenu de /offres et /en/packages, dans les deux langues.
// Utilisé par `PackagesContent.astro`, lui-même rendu par les deux
// pages. NE PAS recopier ces chaînes dans une page : les modifier
// ici se répercute sur les deux langues, et le type garantit la
// parité FR/EN.
//
// RÈGLES COMMERCIALES à ne pas contourner en éditant ce fichier :
//   - tous les prix sont annoncés « À partir de » / « From » ;
//   - aucune promesse d'illimité (modifications, support, SEO) ;
//   - le périmètre exact est arrêté au devis, pas ici.
// ============================================================

/** Identifiant d'offre, repris en paramètre d'URL vers le formulaire. */
export type PackageId = 'essentiel' | 'business' | 'signature';

export interface PackageOffer {
  id: PackageId;
  name: string;
  tagline: string;
  /** Mention « À partir de », au-dessus du montant. Absente sur un devis. */
  priceLabel?: string;
  /** Montant, ou mention « Sur devis » pour une offre non forfaitisée. */
  price: string;
  /** Précision sous le prix, pour une offre sur devis. Optionnel. */
  priceSub?: string;
  /** Plancher tarifaire, affiché en retrait sous « Sur devis ». Optionnel. */
  priceFrom?: string;
  description: string;
  /** Intitulé au-dessus de la liste (« Tout ESSENTIEL + »). Optionnel. */
  featuresIntro?: string;
  features: string[];
  delayLabel: string;
  delayValue: string;
  /** Ligne d'option payante, juste au-dessus du bouton. Optionnel. */
  option?: string;
  cta: string;
  /** Renseigné uniquement sur l'offre mise en avant. */
  badge?: string;
}

export interface CarePlan {
  name: string;
  price: string;
  period: string;
  /** Ligne d'introduction (« Pour : »), affichée avant la liste. Optionnel. */
  intro?: string;
  features: string[];
}

export interface CaseStudyBlock {
  label: string;
  text: string;
}

export interface PackagesCopy {
  navLabel: string;
  metaTitle: string;
  metaDescription: string;

  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    statement: string;
    ctaPrimary: string;
    ctaSecondary: string;
    benefits: string[];
  };

  packagesTitle: string;
  offers: PackageOffer[];

  bespoke: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
  };

  caseStudy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    blocks: CaseStudyBlock[];
    cta: string;
  };

  care: {
    eyebrow: string;
    title: string;
    subtitle: string;
    plans: CarePlan[];
    disclaimer: string;
  };

  finalCta: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    text: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

const fr: PackagesCopy = {
  navLabel: 'Offres',
  metaTitle: 'Offres & Tarifs | Création de sites, plateformes & IA | One Nation Agency',
  metaDescription:
    "Découvrez les offres One Nation Agency : sites web premium, plateformes métier, réservation, paiement, automatisation et solutions digitales sur mesure.",

  hero: {
    eyebrow: 'Nos offres',
    titleLine1: 'DES SOLUTIONS DIGITALES CLAIRES.',
    titleLine2: 'DES INVESTISSEMENTS MAÎTRISÉS.',
    description:
      "De la présence en ligne essentielle aux plateformes métier sur mesure, nous concevons des expériences digitales performantes, élégantes et pensées autour de vos objectifs.",
    statement: "3 niveaux d'accompagnement pour transformer votre présence digitale.",
    ctaPrimary: 'Découvrir les offres',
    ctaSecondary: 'Parler de mon projet',
    benefits: ['Design premium', 'Bilingue FR / EN', 'Mobile first', 'Accompagnement de A à Z'],
  },

  packagesTitle: 'TROIS NIVEAUX.<br />UN MÊME NIVEAU D\'EXIGENCE.',

  offers: [
    {
      id: 'essentiel',
      name: 'ESSENTIEL',
      tagline: 'Votre présence digitale professionnelle.',
      priceLabel: 'À partir de',
      price: '1 490 €',
      description:
        "Pour les indépendants, restaurants, professionnels du tourisme, consultants et petites entreprises qui souhaitent disposer d'une présence digitale professionnelle sans fonctionnalités métier complexes.",
      features: [
        'Site vitrine jusqu\'à 5 pages',
        'Design personnalisé et responsive',
        'Optimisation mobile',
        'Formulaire de contact',
        'Réseaux sociaux et WhatsApp',
        'SEO technique de base',
        'Configuration du nom de domaine',
        'Mise en ligne',
        'Formation rapide à la prise en main',
        '1 langue',
      ],
      delayLabel: 'Délai indicatif',
      delayValue: '7 à 15 jours',
      option: 'Version bilingue FR / EN : +350 €',
      cta: 'Démarrer mon projet',
    },
    {
      id: 'business',
      name: 'BUSINESS',
      badge: 'Le plus choisi',
      tagline: 'Un site qui travaille pour votre activité.',
      priceLabel: 'À partir de',
      price: '2 490 €',
      description:
        "Pour les entreprises qui souhaitent transformer leur site en véritable outil commercial, générer davantage de demandes et automatiser une partie de leur parcours client.",
      featuresIntro: 'Tout ESSENTIEL, plus :',
      features: [
        'Jusqu\'à 10 pages',
        'Version FR / EN',
        'CMS / administration',
        'Formulaires avancés',
        'Réservation ou prise de rendez-vous',
        'Automatisations e-mail',
        'Analytics',
        'Optimisation SEO',
        'Intégration WhatsApp',
        'Accompagnement au contenu',
        'Formation administrateur',
      ],
      delayLabel: 'Délai indicatif',
      delayValue: '2 à 4 semaines',
      cta: 'Développer mon activité',
    },
    {
      id: 'signature',
      name: 'SIGNATURE',
      tagline: 'Votre plateforme digitale sur mesure.',
      // Pas de forfait affiché : le périmètre d'une plateforme métier ne
      // se laisse pas résumer par un montant. Le plancher reste visible,
      // en retrait, pour ne pas laisser le visiteur sans repère.
      price: 'Sur devis',
      priceSub: 'Selon périmètre et complexité',
      priceFrom: 'à partir de 3 900 €',
      description:
        "Pour les entreprises dont le digital fait directement partie du business model : tourisme, immobilier, locations saisonnières, services, marketplaces et plateformes métier.",
      featuresIntro: 'Selon les besoins du projet :',
      features: [
        'Back-office personnalisé',
        'Comptes utilisateurs',
        'Réservation avancée',
        'Paiement en ligne',
        'Synchronisation de calendriers',
        'API et intégrations externes',
        'Workflows automatisés',
        'Dashboard métier',
        'Architecture évolutive',
        'Automatisations IA',
        'Accompagnement technique renforcé',
      ],
      delayLabel: 'Délai',
      delayValue: 'Sur étude du projet',
      cta: 'Étudier mon projet',
    },
  ],

  bespoke: {
    eyebrow: 'Sur mesure',
    title: 'VOTRE PROJET SORT DU CADRE ?',
    text: "Application métier, e-commerce avancé, marketplace, portail client, automatisation complexe ou intégration à votre système d'information : nous concevons également des solutions entièrement sur mesure.",
    cta: 'Parler à One Nation Agency',
  },

  caseStudy: {
    eyebrow: 'Case study',
    title: 'UN PROJET SIGNATURE<br />DÉJÀ DÉPLOYÉ À SINT MAARTEN.',
    subtitle: 'Island Living SXM, reprendre le contrôle de ses réservations.',
    blocks: [
      {
        label: 'Le besoin',
        text: 'Réduire la dépendance aux plateformes de réservation et développer les réservations directes.',
      },
      {
        label: 'Notre réponse',
        text: 'Site premium bilingue, réservation directe, gestion des disponibilités et administration simplifiée.',
      },
      {
        label: 'Le défi',
        text: 'Trouver une solution de paiement compatible avec les contraintes bancaires locales de Sint Maarten.',
      },
      {
        label: 'La solution',
        text: 'Recherche d\'une alternative adaptée à Stripe, intégration Fygaro, coordination bancaire et mise en place du parcours de paiement.',
      },
    ],
    cta: 'Découvrir le projet',
  },

  care: {
    eyebrow: 'Après la mise en ligne',
    title: 'VOTRE SOLUTION RESTE<br />ENTRE DE BONNES MAINS.',
    subtitle: 'Hébergement, maintenance et support adaptés à votre niveau de besoin.',
    plans: [
      {
        name: 'CARE',
        price: '49 €',
        period: '/ mois',
        features: ['Hébergement géré', 'Surveillance', 'Sauvegardes', 'Mises à jour techniques essentielles'],
      },
      {
        name: 'CARE PLUS',
        price: '99 €',
        period: '/ mois',
        features: [
          'Tout Care',
          'Support prioritaire',
          'Petites modifications de contenu - jusqu\'à 30 min/mois',
          'Monitoring renforcé',
        ],
      },
      {
        name: 'BUSINESS CARE',
        price: 'À partir de 149 €',
        period: '/ mois',
        intro: 'Pour :',
        features: [
          'Plateformes métier',
          'Réservation',
          'Paiement',
          'API',
          'Applications métier',
          'Support adapté à l\'architecture',
        ],
      },
    ],
    disclaimer:
      "Les prestations d'hébergement, de maintenance et de support sont adaptées à la solution déployée et précisées dans chaque proposition commerciale.",
  },

  finalCta: {
    eyebrow: 'Votre projet',
    titleLine1: 'VOUS AVEZ UNE IDÉE.',
    titleLine2: 'CONSTRUISONS LA BONNE SOLUTION.',
    text: "Parlez-nous de votre projet et recevez une première recommandation sur le format le plus adapté à vos besoins.",
    ctaPrimary: 'Parler de mon projet',
    ctaSecondary: 'Nous contacter',
  },
};

const en: PackagesCopy = {
  navLabel: 'Packages',
  metaTitle: 'Packages & Pricing | Websites, Digital Platforms & AI | One Nation Agency',
  metaDescription:
    'Explore One Nation Agency packages for premium websites, business platforms, booking systems, payments, automation and bespoke digital solutions.',

  hero: {
    eyebrow: 'Our packages',
    titleLine1: 'CLEAR DIGITAL SOLUTIONS.',
    titleLine2: 'BUDGETS YOU CAN PLAN FOR.',
    description:
      'From an essential online presence to fully customized business platforms, we design premium digital experiences built around your goals.',
    statement: '3 levels of support to transform your digital presence.',
    ctaPrimary: 'Explore our packages',
    ctaSecondary: 'Discuss my project',
    benefits: ['Premium design', 'FR / EN', 'Mobile first', 'End-to-end support'],
  },

  packagesTitle: 'THREE LEVELS.<br />ONE STANDARD OF CRAFT.',

  offers: [
    {
      id: 'essentiel',
      name: 'ESSENTIAL',
      tagline: 'Your professional online presence.',
      priceLabel: 'From',
      price: '€1,490',
      description:
        'For independent professionals, restaurants, tourism businesses, consultants and small companies looking for a premium professional website without complex business features.',
      features: [
        'Up to 5 pages',
        'Custom responsive design',
        'Mobile optimization',
        'Contact form',
        'Social media and WhatsApp integration',
        'Basic technical SEO',
        'Domain configuration',
        'Deployment',
        'Quick handover training',
        '1 language',
      ],
      delayLabel: 'Estimated delivery',
      delayValue: '7 to 15 days',
      option: 'Bilingual FR / EN: +€350',
      cta: 'Start my project',
    },
    {
      id: 'business',
      name: 'BUSINESS',
      badge: 'Most popular',
      tagline: 'A website designed to support your business.',
      priceLabel: 'From',
      price: '€2,490',
      description:
        'For businesses looking to turn their website into a genuine sales tool, generate more enquiries and automate part of the customer journey.',
      featuresIntro: 'Everything in ESSENTIAL, plus:',
      features: [
        'Up to 10 pages',
        'FR / EN',
        'CMS / admin area',
        'Advanced forms',
        'Booking or appointment system',
        'Email automations',
        'Analytics',
        'SEO optimization',
        'WhatsApp integration',
        'Content guidance',
        'Admin training',
      ],
      delayLabel: 'Estimated delivery',
      delayValue: '2 to 4 weeks',
      cta: 'Grow my business',
    },
    {
      id: 'signature',
      name: 'SIGNATURE',
      tagline: 'A digital platform built around your business.',
      price: 'On request',
      priceSub: 'Based on scope and complexity',
      priceFrom: 'from €3,900',
      description:
        'For businesses where digital is part of the business model: tourism, real estate, vacation rentals, services, marketplaces and custom business platforms.',
      featuresIntro: 'Depending on project requirements:',
      features: [
        'Custom back office',
        'User accounts',
        'Advanced booking',
        'Online payments',
        'Calendar synchronization',
        'APIs and external integrations',
        'Automated workflows',
        'Business dashboard',
        'Scalable architecture',
        'AI automations',
        'Enhanced technical support',
      ],
      delayLabel: 'Delivery',
      delayValue: 'Based on project scope',
      cta: 'Discuss my project',
    },
  ],

  bespoke: {
    eyebrow: 'Bespoke',
    title: 'NEED SOMETHING MORE SPECIFIC?',
    text: 'Custom business application, advanced e-commerce, marketplace, customer portal, complex automation or system integration: we also design fully bespoke digital solutions.',
    cta: 'Talk to One Nation Agency',
  },

  caseStudy: {
    eyebrow: 'Case study',
    title: 'A SIGNATURE PROJECT<br />ALREADY DELIVERED IN SINT MAARTEN.',
    subtitle: 'Island Living SXM, taking back control of direct bookings.',
    blocks: [
      {
        label: 'The need',
        text: 'Reduce dependency on booking platforms and develop direct bookings.',
      },
      {
        label: 'Our response',
        text: 'Premium bilingual website, direct booking, availability management and simplified administration.',
      },
      {
        label: 'The challenge',
        text: "Finding a payment solution compatible with Sint Maarten's local banking constraints.",
      },
      {
        label: 'The solution',
        text: 'Researching a suitable alternative to Stripe, Fygaro integration, coordination with the local bank and implementation of the payment journey.',
      },
    ],
    cta: 'Discover the project',
  },

  care: {
    eyebrow: 'After launch',
    title: 'YOUR DIGITAL SOLUTION<br />STAYS IN GOOD HANDS.',
    subtitle: 'Managed hosting, maintenance and support adapted to your needs.',
    plans: [
      {
        name: 'CARE',
        price: '€49',
        period: '/ month',
        features: ['Managed hosting', 'Monitoring', 'Backups', 'Essential technical updates'],
      },
      {
        name: 'CARE PLUS',
        price: '€99',
        period: '/ month',
        features: [
          'Everything in Care',
          'Priority support',
          'Minor content updates - up to 30 min/month',
          'Enhanced monitoring',
        ],
      },
      {
        name: 'BUSINESS CARE',
        price: 'From €149',
        period: '/ month',
        intro: 'For:',
        features: [
          'Business platforms',
          'Booking systems',
          'Payments',
          'APIs',
          'Business applications',
          'Architecture-specific support',
        ],
      },
    ],
    disclaimer:
      'Hosting, maintenance and support are adapted to the deployed solution and detailed in each commercial proposal.',
  },

  finalCta: {
    eyebrow: 'Your project',
    titleLine1: 'YOU HAVE AN IDEA.',
    titleLine2: "LET'S BUILD THE RIGHT SOLUTION.",
    text: 'Tell us about your project and receive an initial recommendation on the format best suited to your needs.',
    ctaPrimary: 'Discuss my project',
    ctaSecondary: 'Contact us',
  },
};

/** Contenu des offres dans la langue de la page. Retombe sur le français. */
export function getPackagesCopy(lang: string): PackagesCopy {
  return lang === 'en' ? en : fr;
}

/** Chemin de la page Offres dans la langue demandée. */
export function packagesHref(lang: string): string {
  return lang === 'en' ? '/en/packages' : '/offres';
}

/**
 * Lien vers le formulaire de contact, préchargé avec l'offre choisie.
 * La page contact lit `?offre=` et prérenseigne sujet et message.
 */
export function packageContactHref(lang: string, id: PackageId): string {
  const base = lang === 'en' ? '/en/contact' : '/contact';
  return `${base}?offre=${id}#contactForm`;
}
