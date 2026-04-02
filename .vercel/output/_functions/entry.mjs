import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DaJlczos.mjs';
import { manifest } from './manifest_C9IAIYdo.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/afrique.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/cgv.astro.mjs');
const _page4 = () => import('./pages/conseil-strategique.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/design-graphique.astro.mjs');
const _page7 = () => import('./pages/e-reputation.astro.mjs');
const _page8 = () => import('./pages/en/artificial-intelligence.astro.mjs');
const _page9 = () => import('./pages/en/contact.astro.mjs');
const _page10 = () => import('./pages/en/portfolio.astro.mjs');
const _page11 = () => import('./pages/en/services.astro.mjs');
const _page12 = () => import('./pages/en/vision.astro.mjs');
const _page13 = () => import('./pages/en.astro.mjs');
const _page14 = () => import('./pages/intelligence-artificielle.astro.mjs');
const _page15 = () => import('./pages/mentions-legales.astro.mjs');
const _page16 = () => import('./pages/politique-confidentialite.astro.mjs');
const _page17 = () => import('./pages/politique-cookies.astro.mjs');
const _page18 = () => import('./pages/portfolio.astro.mjs');
const _page19 = () => import('./pages/referencement.astro.mjs');
const _page20 = () => import('./pages/relations-presse.astro.mjs');
const _page21 = () => import('./pages/reseaux-sociaux.astro.mjs');
const _page22 = () => import('./pages/services.astro.mjs');
const _page23 = () => import('./pages/temoignages.astro.mjs');
const _page24 = () => import('./pages/vision.astro.mjs');
const _page25 = () => import('./pages/webmarketing.astro.mjs');
const _page26 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.18.1_@vercel+functions@3.4.3_rollup@4.60.1_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/afrique.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/cgv.astro", _page3],
    ["src/pages/conseil-strategique.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/design-graphique.astro", _page6],
    ["src/pages/e-reputation.astro", _page7],
    ["src/pages/en/artificial-intelligence.astro", _page8],
    ["src/pages/en/contact.astro", _page9],
    ["src/pages/en/portfolio.astro", _page10],
    ["src/pages/en/services.astro", _page11],
    ["src/pages/en/vision.astro", _page12],
    ["src/pages/en/index.astro", _page13],
    ["src/pages/intelligence-artificielle.astro", _page14],
    ["src/pages/mentions-legales.astro", _page15],
    ["src/pages/politique-confidentialite.astro", _page16],
    ["src/pages/politique-cookies.astro", _page17],
    ["src/pages/portfolio.astro", _page18],
    ["src/pages/referencement.astro", _page19],
    ["src/pages/relations-presse.astro", _page20],
    ["src/pages/reseaux-sociaux.astro", _page21],
    ["src/pages/services.astro", _page22],
    ["src/pages/temoignages.astro", _page23],
    ["src/pages/vision.astro", _page24],
    ["src/pages/webmarketing.astro", _page25],
    ["src/pages/index.astro", _page26]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "1ceedd9d-8cbd-4420-971b-d5982c39721b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
