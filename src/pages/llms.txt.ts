import type { APIRoute } from 'astro';
import { localePairs, type LocalePair } from '../data/routes';
import { getCivicCopy, CIVIC_URL, CIVIC_ANCHOR } from '../data/civic';
import { getPackagesCopy, type OfferCard } from '../data/packages';
import { getProjects, portfolioStats } from '../data/projects';
import { FOUNDED_YEAR } from '../data/stats';
import { FRANCE_NUM_URL } from '../data/francenum';

// ============================================================
// LLMS.TXT GÉNÉRÉ AU BUILD
// ------------------------------------------------------------
// Présentation de l'agence destinée aux moteurs de réponse IA
// (ChatGPT, Claude, Perplexity, Gemini…), au format proposé sur
// https://llmstxt.org : titre, résumé, puis listes de liens commentés.
//
// Tout ce qui existe déjà ailleurs est lu dans src/data/ : pages,
// offres et tarifs, One Nation Civic, réalisations. Un changement de
// prix ou un nouveau projet se répercute ici sans y toucher.
// Seuls les résumés de pages ci-dessous sont propres à ce fichier.
//
// Volontairement absents : le taux de satisfaction (non vérifié,
// voir CLAUDE.md section 5) et les avis clients.
// ============================================================

const SITE = 'https://www.onenationagency.com';

/** Résumé de chaque page principale, en français. */
const PAGE_SUMMARY: Record<string, string> = {
  '/': "présentation de l'agence, de ses trois expertises et de One Nation Civic.",
  '/vision': "l'agence, sa vision et son ancrage entre la France et l'Afrique.",
  '/services': 'détail des trois expertises (communication stratégique, intelligence artificielle, création web premium).',
  '/portfolio': 'réalisations détaillées, projet par projet, avec avis clients.',
  '/intelligence-artificielle': 'agents IA sur mesure pour les entreprises, et One Nation Civic pour les institutions.',
  '/offres': 'création de site, diagnostic, sprint et maintenance, avec leurs tarifs.',
  '/contact': 'formulaire de contact, e-mail et téléphone.',
};

const link = (label: string, path: string, note?: string) =>
  `- [${label}](${SITE}${path})${note ? `: ${note}` : ''}`;

/** Prix tel que le visiteur le lit : « À partir de 1 490 € », « Sur devis (à partir de 3 900 €) ». */
function priceText(o: OfferCard): string {
  const base = [o.priceLabel, o.price, o.pricePeriod].filter(Boolean).join(' ');
  return o.priceFrom ? `${base} (${o.priceFrom})` : base;
}

/** Ajoute un point final s'il manque. */
const sentence = (t: string) => (/[.!?]$/.test(t) ? t : `${t}.`);

/** « Hébergement géré ; surveillance… » : une phrase à partir de la liste. */
const featureList = (f: string[]) =>
  f.map((x, i) => (i ? x.charAt(0).toLowerCase() + x.slice(1) : x)).join(' ; ');

// Les formules Care n'ont pas d'accroche : on décrit leur contenu.
const offerLine = (o: OfferCard) =>
  `- ${o.name} : ${priceText(o)}. ${sentence(o.tagline ?? featureList(o.features))}`;

export const GET: APIRoute = () => {
  const civic = getCivicCopy('fr');
  const packages = getPackagesCopy('fr');
  const projects = getProjects('fr');
  const main = localePairs.filter((p) => p.group === 'main');
  const legal = localePairs.filter((p) => p.group === 'legal');
  const services = localePairs.find((p) => p.fr === '/services') as LocalePair;

  const lines = [
    '# One Nation Agency',
    '',
    "> Agence de communication stratégique institutionnelle, d'intelligence artificielle et de création web premium, basée en région parisienne et active en France, en Afrique et à l'international. Éditrice de One Nation Civic, plateforme d'agents IA multilingues pour les institutions et services publics.",
    '',
    `Fondée en ${FOUNDED_YEAR}, One Nation Agency accompagne institutions, entreprises et personnalités publiques. ${portfolioStats.projects} projets livrés dans ${portfolioStats.countries} pays, présentés dans le portfolio. Site en français et en anglais.`,
    '',
    `Référencée Activateur France Num, le dispositif public d'accompagnement des TPE et PME au numérique : [fiche de l'agence](${FRANCE_NUM_URL}).`,
    '',
    '## Expertises',
    '',
    ...(services.sections ?? []).map((s) => link(s.label.fr, `/services#${s.anchor}`)),
    link('Agents IA sur mesure', '/intelligence-artificielle', PAGE_SUMMARY['/intelligence-artificielle']),
    '',
    '## One Nation Civic',
    '',
    civic.text,
    '',
    ...civic.features.map((f) => `- ${f.replace(/‑/g, '-')}`),
    '',
    `- [Site de One Nation Civic](${CIVIC_URL})`,
    link('Présentation sur le site de l\'agence', `/#${CIVIC_ANCHOR}`),
    '',
    '## Offres',
    '',
    'Tarifs indicatifs, nets : TVA non applicable (article 293 B du CGI). Le périmètre est arrêté au devis.',
    '',
    'Pour créer un site :',
    ...packages.offers.map(offerLine),
    '',
    'Pour un site qui existe déjà :',
    ...packages.existing.offers.map(offerLine),
    ...packages.care.plans.map(offerLine),
    `- ${packages.care.beyond}`,
    '',
    link('Toutes les offres', '/offres'),
    '',
    '## Réalisations',
    '',
    ...projects.map((p) =>
      link(p.title, `/portfolio#${p.id}`, `${p.category} (${p.country}). ${sentence(p.subtitle)}`)
    ),
    '',
    '## Pages principales',
    '',
    ...main.map((p) => link(p.label.fr, p.fr, PAGE_SUMMARY[p.fr])),
    '',
    '## Contact',
    '',
    '- E-mail : contact@onenationagency.com',
    '- Téléphone : +33 6 98 61 97 10',
    '- Adresse : 6 rue Jean Colly, 94140 Alfortville, France',
    link('Formulaire de contact', '/contact'),
    '',
    '## English',
    '',
    ...main.map((p) => link(p.label.en, p.en)),
    '',
    '## Optional',
    '',
    ...legal.map((p) => link(p.label.fr, p.fr)),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
