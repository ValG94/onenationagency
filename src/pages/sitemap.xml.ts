import type { APIRoute } from 'astro';
import { localePairs, normalisePath } from '../data/routes';

// ============================================================
// SITEMAP GÉNÉRÉ AU BUILD
// ------------------------------------------------------------
// Remplace l'ancien public/sitemap.xml maintenu à la main, dont le
// lastmod était figé et qui ignorait les pages ajoutées depuis.
// Les pages sont découvertes dans src/pages/ et les alternatives de
// langue proviennent de src/data/routes.ts : ajouter une page la met
// automatiquement dans le sitemap.
// ============================================================

const SITE = 'https://www.onenationagency.com';

// Découverte des pages : toutes les routes .astro de src/pages/
const pageModules = import.meta.glob('./**/*.astro');

/** Chemin de fichier Astro -> chemin d'URL. */
function toUrlPath(file: string): string {
  const withoutPrefix = file.replace(/^\.\//, '').replace(/\.astro$/, '');
  if (withoutPrefix === 'index') return '/';
  return '/' + withoutPrefix.replace(/\/index$/, '');
}

/** Alternative dans l'autre langue, si la page est traduite. */
function alternates(path: string): { fr: string; en: string } | null {
  const current = normalisePath(path);
  return (
    localePairs.find(
      (p) => normalisePath(p.fr) === current || normalisePath(p.en) === current
    ) ?? null
  );
}

const LEGAL = /\/(cgv|mentions-legales|politique-|terms-and-conditions|legal-notice|privacy-policy|cookie-policy)/;

function priority(path: string): string {
  if (path === '/' || path === '/en') return '1.0';
  if (LEGAL.test(path)) return '0.3';
  return '0.8';
}

function changefreq(path: string): string {
  if (path === '/' || path === '/en') return 'weekly';
  if (LEGAL.test(path)) return 'yearly';
  return 'monthly';
}

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const paths = Object.keys(pageModules)
    .map(toUrlPath)
    // Le sitemap lui-même et les éventuelles pages d'erreur n'y figurent pas.
    .filter((p) => !p.startsWith('/404'))
    .sort();

  const urls = paths
    .map((path) => {
      const pair = alternates(path);
      const links = pair
        ? [
            `    <xhtml:link rel="alternate" hreflang="fr" href="${SITE}${pair.fr}"/>`,
            `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${pair.en}"/>`,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pair.fr}"/>`,
          ].join('\n')
        : '';

      return [
        '  <url>',
        `    <loc>${SITE}${path}</loc>`,
        links,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq(path)}</changefreq>`,
        `    <priority>${priority(path)}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${urls}

</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
