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
//   - les prix de création sont annoncés « À partir de » / « From » ;
//     seule exception, le Diagnostic : périmètre fixe, donc prix fixe ;
//   - jamais « HT » : l'agence est en franchise de TVA (art. 293 B du
//     CGI, voir les CGV). Un prix affiché est le prix payé ;
//   - aucune promesse d'illimité (modifications, support, SEO) ;
//   - le périmètre exact est arrêté au devis, pas ici.
//
// La page est organisée par SITUATION du visiteur, pas par budget :
//   - `offers`          : « Vous n'avez pas encore de site ? »
//   - `existingOffers`  : « Votre site existe déjà ? » (Diagnostic, Sprint)
//   - `care`            : maintenance, ouverte aux sites faits ailleurs.
// Ne pas fusionner ces listes dans une même grille : alignés, cinq prix
// se lisent comme une échelle de budget et le visiteur descend toujours
// au premier barreau.
// ============================================================

/**
 * Identifiant d'offre, repris en paramètre d'URL vers le formulaire
 * (`/contact?offre=<id>`). Le formulaire retrouve le nom de l'offre via
 * `getContactOffers()` : ajouter un identifiant ici suffit.
 */
export type PackageId = 'essentiel' | 'business' | 'signature' | 'diagnostic' | 'sprint' | 'care';

/** Ligne du pied de carte : « Délai », « Paiement »… */
export interface OfferTerm {
  label: string;
  value: string;
}

/**
 * Montant lu par les données structurées (JSON-LD), pas par le visiteur.
 * Le texte affiché reste `price` : ce chiffre n'existe que pour Google.
 */
export interface OfferAmount {
  value: number;
  /** Vrai pour un prix ferme (Diagnostic) ; sinon c'est un plancher. */
  fixed?: boolean;
  /** Prix mensuel (formules Care). */
  monthly?: boolean;
}

/**
 * Une carte d'offre, telle que l'affiche `PackageCard.astro`. Commune aux
 * offres de création, aux formats pour site existant et aux formules Care :
 * tous les champs facultatifs sont simplement omis à l'affichage.
 */
export interface OfferCard {
  name: string;
  tagline?: string;
  /** Mention « À partir de », au-dessus du montant. Absente sur un prix fixe. */
  priceLabel?: string;
  /** Montant, ou mention « Sur devis » pour une offre non forfaitisée. */
  price: string;
  /** Périodicité sous le montant (« / mois »). Optionnel. */
  pricePeriod?: string;
  /** Précision sous le prix, pour une offre sur devis. Optionnel. */
  priceSub?: string;
  /** Plancher tarifaire, affiché en retrait sous « Sur devis ». Optionnel. */
  priceFrom?: string;
  amount: OfferAmount;
  description?: string;
  /** Intitulé au-dessus de la liste (« Tout ESSENTIEL + »). Optionnel. */
  featuresIntro?: string;
  features: string[];
  /** Lignes du pied de carte (délai, restitution, paiement). Optionnel. */
  terms?: OfferTerm[];
  /** Ligne d'option payante, juste au-dessus du bouton. Optionnel. */
  option?: string;
  /** Mention à lire absolument, encadrée au-dessus du bouton. Optionnel. */
  highlight?: string;
  /** Renseigné uniquement sur l'offre mise en avant. */
  badge?: string;
}

/** Offre qui porte son propre bouton vers le formulaire de contact. */
export interface PackageOffer extends OfferCard {
  id: PackageId;
  tagline: string;
  description: string;
  cta: string;
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

  /** Section 1 : question posée au visiteur, au-dessus du titre. */
  packagesLabel: string;
  packagesTitle: string;
  offers: PackageOffer[];

  /** Section 2 : formats pour un site qui existe déjà. */
  existing: {
    label: string;
    title: string;
    offers: PackageOffer[];
  };

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

  /** Maintenance vendue seule, dans la section 2. Un seul bouton. */
  care: {
    title: string;
    /** Phrase qui ouvre l'offre aux sites réalisés ailleurs. */
    lead: string;
    plans: OfferCard[];
    /** Ligne discrète sous les cartes : Business Care. */
    beyond: string;
    cta: string;
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
  metaTitle: 'Offres & Tarifs | Création de sites, audit, maintenance & IA | One Nation Agency',
  metaDescription:
    "Création de sites et de plateformes métier, diagnostic digital et IA en 72 h, sprints ciblés, hébergement et maintenance de votre site existant. Les offres One Nation Agency.",

  hero: {
    eyebrow: 'Nos offres',
    titleLine1: 'DES SOLUTIONS DIGITALES CLAIRES.',
    titleLine2: 'DES INVESTISSEMENTS MAÎTRISÉS.',
    description:
      "De la présence en ligne essentielle aux plateformes métier sur mesure, nous concevons des expériences digitales performantes, élégantes et pensées autour de vos objectifs.",
    statement: 'Créer votre site, ou faire progresser celui que vous avez déjà.',
    ctaPrimary: 'Découvrir les offres',
    ctaSecondary: 'Parler de mon projet',
    benefits: ['Design premium', 'Bilingue FR / EN', 'Mobile first', 'Accompagnement de A à Z'],
  },

  packagesLabel: "Vous n'avez pas encore de site ?",
  packagesTitle: 'TROIS NIVEAUX.<br />UN MÊME NIVEAU D\'EXIGENCE.',

  offers: [
    {
      id: 'essentiel',
      name: 'ESSENTIEL',
      tagline: 'Votre présence digitale professionnelle.',
      priceLabel: 'À partir de',
      price: '1 490 €',
      amount: { value: 1490 },
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
      terms: [{ label: 'Délai indicatif', value: '7 à 15 jours' }],
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
      amount: { value: 2490 },
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
      terms: [{ label: 'Délai indicatif', value: '2 à 4 semaines' }],
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
      amount: { value: 3900 },
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
      terms: [{ label: 'Délai', value: 'Sur étude du projet' }],
      cta: 'Étudier mon projet',
    },
  ],

  existing: {
    label: 'Votre site existe déjà ?',
    title: 'UN REGARD. UNE ACTION. UN SUIVI.',
    offers: [
      {
        id: 'diagnostic',
        name: 'DIAGNOSTIC DIGITAL & IA EXPRESS',
        tagline: 'Un regard externe, structuré et directement exploitable.',
        // Pas de « À partir de » : le périmètre est fixe, le prix aussi.
        price: '490 €',
        amount: { value: 490, fixed: true },
        description:
          "En 72 h, nous analysons votre environnement digital afin d'identifier les améliorations réellement prioritaires.",
        featuresIntro: 'Vous recevez :',
        features: [
          'Analyse de votre site et de votre parcours client',
          'Identification des principaux points de friction',
          '3 quick wins digitaux à mettre en œuvre rapidement',
          "2 opportunités réalistes d'automatisation ou d'IA",
          'Une feuille de route priorisée sur 30 jours',
        ],
        terms: [
          { label: 'Délai', value: '72 h après réception des éléments nécessaires' },
          { label: 'Restitution', value: '30 min en visioconférence' },
          { label: 'Paiement', value: 'À la commande' },
        ],
        highlight: "Les 490 € sont déduits du Sprint Digital s'il est commandé dans les 30 jours.",
        cta: 'Commander mon diagnostic',
      },
      {
        id: 'sprint',
        name: 'SPRINT DIGITAL',
        tagline: 'Nous ne nous contentons pas de recommander, nous mettons en œuvre une priorité.',
        priceLabel: 'À partir de',
        price: '990 €',
        amount: { value: 990 },
        description:
          'À partir d\'un besoin clairement identifié, nous réalisons un sprint ciblé sur un objectif précis. Périmètre, délai et livrables sont confirmés avant démarrage.',
        featuresIntro: 'Exemples :',
        features: [
          "Amélioration d'un parcours de contact ou de conversion",
          'Landing page ou page commerciale',
          "Automatisation d'une tâche répétitive",
          "Intégration d'un assistant IA ou d'une FAQ conversationnelle",
          "Optimisation UX/UI d'un parcours existant",
        ],
        terms: [{ label: 'Paiement', value: 'Acompte de 50 % à la commande' }],
        cta: 'Lancer un sprint',
      },
    ],
  },

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
    title: 'CARE, VOTRE SITE RESTE EN LIGNE.',
    lead: "Nous maintenons aussi les sites que nous n'avons pas réalisés.",
    plans: [
      {
        name: 'CARE',
        price: '49 €',
        pricePeriod: 'par mois',
        amount: { value: 49, monthly: true },
        features: [
          'Hébergement géré',
          'Surveillance et monitoring',
          'Sauvegardes régulières',
          'Mises à jour techniques essentielles',
        ],
      },
      {
        name: 'CARE PLUS',
        badge: 'Recommandé',
        price: '99 €',
        pricePeriod: 'par mois',
        amount: { value: 99, monthly: true },
        featuresIntro: 'Tout Care, plus :',
        features: [
          'Support prioritaire',
          'Modifications de contenu, 30 min par mois',
          'Monitoring renforcé',
        ],
      },
    ],
    beyond:
      'Au-delà, pour les plateformes métier, la réservation, le paiement ou les API : Business Care à partir de 149 € par mois.',
    cta: 'Protéger mon site',
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
  metaTitle: 'Packages & Pricing | Websites, Audits, Maintenance & AI | One Nation Agency',
  metaDescription:
    'Websites and business platforms, a 72-hour digital and AI audit, focused sprints, plus hosting and maintenance for your existing website. One Nation Agency packages.',

  hero: {
    eyebrow: 'Our packages',
    titleLine1: 'CLEAR DIGITAL SOLUTIONS.',
    titleLine2: 'BUDGETS YOU CAN PLAN FOR.',
    description:
      'From an essential online presence to fully customized business platforms, we design premium digital experiences built around your goals.',
    statement: 'Build your website, or take the one you already have further.',
    ctaPrimary: 'Explore our packages',
    ctaSecondary: 'Discuss my project',
    benefits: ['Premium design', 'FR / EN', 'Mobile first', 'End-to-end support'],
  },

  packagesLabel: "Don't have a website yet?",
  packagesTitle: 'THREE LEVELS.<br />ONE STANDARD OF CRAFT.',

  offers: [
    {
      id: 'essentiel',
      name: 'ESSENTIAL',
      tagline: 'Your professional online presence.',
      priceLabel: 'From',
      price: '€1,490',
      amount: { value: 1490 },
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
      terms: [{ label: 'Estimated delivery', value: '7 to 15 days' }],
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
      amount: { value: 2490 },
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
      terms: [{ label: 'Estimated delivery', value: '2 to 4 weeks' }],
      cta: 'Grow my business',
    },
    {
      id: 'signature',
      name: 'SIGNATURE',
      tagline: 'A digital platform built around your business.',
      price: 'On request',
      priceSub: 'Based on scope and complexity',
      priceFrom: 'from €3,900',
      amount: { value: 3900 },
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
      terms: [{ label: 'Delivery', value: 'Based on project scope' }],
      cta: 'Discuss my project',
    },
  ],

  existing: {
    label: 'Already have a website?',
    title: 'A FRESH LOOK. A FOCUSED SPRINT. ONGOING CARE.',
    offers: [
      {
        id: 'diagnostic',
        name: 'DIGITAL & AI EXPRESS AUDIT',
        tagline: 'An outside perspective, structured and ready to act on.',
        price: '€490',
        amount: { value: 490, fixed: true },
        description:
          'Within 72 hours, we review your digital setup to pinpoint the improvements that truly matter.',
        featuresIntro: 'You receive:',
        features: [
          'A review of your website and customer journey',
          'The main friction points, identified',
          '3 digital quick wins you can roll out fast',
          '2 realistic automation or AI opportunities',
          'A prioritized 30-day roadmap',
        ],
        terms: [
          { label: 'Delivery', value: '72 hours after we receive the required materials' },
          { label: 'Debrief', value: '30-minute video call' },
          { label: 'Payment', value: 'Upon ordering' },
        ],
        highlight: 'The €490 is credited against a Digital Sprint ordered within 30 days.',
        cta: 'Order my audit',
      },
      {
        id: 'sprint',
        name: 'DIGITAL SPRINT',
        tagline: "We don't stop at recommendations: we deliver one priority.",
        priceLabel: 'From',
        price: '€990',
        amount: { value: 990 },
        description:
          'Starting from a clearly identified need, we run a focused sprint on one specific goal. Scope, timeline and deliverables are confirmed before we start.',
        featuresIntro: 'For example:',
        features: [
          'Improving a contact or conversion journey',
          'A landing page or sales page',
          'Automating a repetitive task',
          'Adding an AI assistant or a conversational FAQ',
          'UX/UI optimization of an existing journey',
        ],
        terms: [{ label: 'Payment', value: '50% deposit upon ordering' }],
        cta: 'Start a sprint',
      },
    ],
  },

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
    title: 'CARE, KEEPING YOUR WEBSITE ONLINE.',
    lead: "We also maintain websites we didn't build.",
    plans: [
      {
        name: 'CARE',
        price: '€49',
        pricePeriod: 'per month',
        amount: { value: 49, monthly: true },
        features: [
          'Managed hosting',
          'Uptime and performance monitoring',
          'Regular backups',
          'Essential technical updates',
        ],
      },
      {
        name: 'CARE PLUS',
        badge: 'Recommended',
        price: '€99',
        pricePeriod: 'per month',
        amount: { value: 99, monthly: true },
        featuresIntro: 'Everything in Care, plus:',
        features: [
          'Priority support',
          'Content updates, 30 min per month',
          'Enhanced monitoring',
        ],
      },
    ],
    beyond:
      'Beyond that, for business platforms, booking, payments or APIs: Business Care from €149 per month.',
    cta: 'Protect my website',
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

/** Ce que le formulaire de contact doit savoir d'une offre pour se préremplir. */
export interface ContactOffer {
  name: string;
  /** Vrai pour les offres destinées à un site existant : le message
      prérempli invite alors à indiquer le site plutôt que le projet. */
  existingSite: boolean;
}

/**
 * Table identifiant → offre, lue par les pages contact (FR et EN) pour
 * préremplir le message quand le visiteur arrive avec `?offre=<id>`.
 *
 * Construite ici plutôt que recopiée dans les pages contact : une offre
 * ajoutée à ce fichier est reconnue par le formulaire sans autre retouche.
 */
export function getContactOffers(lang: string): Record<string, ContactOffer> {
  const t = getPackagesCopy(lang);
  const table: Record<string, ContactOffer> = {};
  for (const offer of t.offers) table[offer.id] = { name: offer.name, existingSite: false };
  for (const offer of t.existing.offers) table[offer.id] = { name: offer.name, existingSite: true };
  // Care n'a qu'un bouton pour ses deux formules : l'identifiant est `care`.
  table.care = { name: 'CARE', existingSite: true };
  return table;
}

/**
 * Offres au format schema.org, pour le JSON-LD des pages Offres.
 * Prix ferme → `price` ; plancher → `minPrice` ; formule mensuelle →
 * `UnitPriceSpecification` à l'unité « MON » (mois).
 *
 * Pas de `valueAddedTaxIncluded` : en franchise de TVA, le prix affiché
 * est le prix payé. Le déclarer « hors taxe » laisserait croire à Google
 * qu'une TVA s'y ajoute.
 */
export function getOffersJsonLd(lang: string) {
  const t = getPackagesCopy(lang);
  const cards: OfferCard[] = [...t.offers, ...t.existing.offers, ...t.care.plans];

  return cards.map((card) => {
    const { value, fixed, monthly } = card.amount;
    const priceSpecification = monthly
      ? { '@type': 'UnitPriceSpecification', priceCurrency: 'EUR', price: value, unitCode: 'MON' }
      : fixed
        ? { '@type': 'PriceSpecification', priceCurrency: 'EUR', price: value }
        : { '@type': 'PriceSpecification', priceCurrency: 'EUR', minPrice: value };

    return {
      '@type': 'Offer',
      name: card.name,
      ...(card.tagline ? { description: card.tagline } : {}),
      priceSpecification,
    };
  });
}
