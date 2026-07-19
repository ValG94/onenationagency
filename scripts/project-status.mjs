// ============================================================
// MISE À JOUR AUTOMATIQUE DE LA FICHE PROJET (CLAUDE.md)
// ------------------------------------------------------------
// Régénère le bloc « État vérifié » de CLAUDE.md à partir du site
// réellement construit. Lancé automatiquement après chaque build
// (script `postbuild` de package.json).
//
// Ne touche à AUCUNE autre section : l'historique et le reste à
// faire sont rédigés à la main.
// ============================================================
import fs from 'node:fs';
import path from 'node:path';

const START = '<!-- AUTO:DEBUT -- ne pas éditer à la main, régénéré par scripts/project-status.mjs -->';
const END = '<!-- AUTO:FIN -->';

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const mb = (n) => (n / 1024 / 1024).toFixed(2) + ' Mo';
const kb = (n) => Math.round(n / 1024) + ' Ko';

function analyse() {
  const all = walk('dist');
  const pages = all.filter((f) => path.basename(f) === 'index.html');
  const routeOf = (f) => '/' + f.split(path.sep).slice(1, -1).join('/');
  const routes = new Set(pages.map(routeOf));
  routes.add('/');

  const exists = (url) => {
    const clean = url.split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
    return routes.has(clean) || fs.existsSync(path.join('dist', clean.slice(1)));
  };

  let brokenLinks = 0;
  let brokenMedia = 0;
  let hreflang = 0;

  for (const f of all.filter((f) => /\.(html|css)$/.test(f))) {
    const t = fs.readFileSync(f, 'utf8');
    for (const m of t.matchAll(/<a[^>]+href="(\/[^"#][^"]*)"/g)) if (!exists(m[1])) brokenLinks++;
    for (const m of t.matchAll(
      /hreflang="[^"]+" href="https:\/\/www\.onenationagency\.com([^"]*)"/g
    )) {
      hreflang++;
      if (!exists(m[1] || '/')) brokenLinks++;
    }
    for (const m of t.matchAll(
      /(?:src=|data-src=|poster=|url\(|og:image" content="https:\/\/www\.onenationagency\.com)["']?(\/[^"')\s>]+\.(?:jpe?g|png|webp|avif|gif|mp4|webm))/gi
    )) {
      if (!fs.existsSync(path.join('dist', decodeURI(m[1]).slice(1)))) brokenMedia++;
    }
  }

  const enPages = pages.filter((f) => f.split(path.sep).includes('en'));
  const noAlternate = pages.filter((f) => !/hreflang="fr"/.test(fs.readFileSync(f, 'utf8')));

  // Agent IA : sa langue doit suivre celle de la page
  const agentMismatch = pages.filter((f) => {
    const t = fs.readFileSync(f, 'utf8');
    return /<html lang="en"/.test(t) !== /class="ai-status-text"[^>]*>Online</.test(t);
  });

  // Poids média chargé au premier rendu, par page
  const weights = pages
    .map((f) => {
      const t = fs.readFileSync(f, 'utf8');
      const srcs = new Set(
        [...t.matchAll(/(?:<img[^>]*src=|poster=)"(\/[^"]+)"/g)].map((m) => m[1])
      );
      let w = 0;
      for (const s of srcs) {
        try {
          w += fs.statSync(path.join('dist', decodeURI(s).slice(1))).size;
        } catch {}
      }
      return { route: routeOf(f) || '/', weight: w };
    })
    .sort((a, b) => b.weight - a.weight);

  const distSize = all.reduce((s, f) => s + fs.statSync(f).size, 0);
  const videos = all.filter((f) => /\.(mp4|webm)$/.test(f));
  const videoSize = videos.reduce((s, f) => s + fs.statSync(f).size, 0);
  const generated = all.filter((f) => f.includes(`_astro${path.sep}`) && /\.(webp|avif)$/.test(f));

  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const sitemap = fs.existsSync('dist/sitemap.xml')
    ? (fs.readFileSync('dist/sitemap.xml', 'utf8').match(/<url>/g) || []).length
    : 0;

  // Chiffres affichés, lus sur la home
  const home = fs.readFileSync('dist/index.html', 'utf8');
  const figures = [...home.matchAll(/class="stat-num"[^>]*>([^<]+)</g)].map((m) => m[1]);
  const labels = [...home.matchAll(/class="stat-label"[^>]*>([^<]+)</g)].map((m) =>
    m[1].replace(/&#39;/g, "'")
  );

  return {
    pages: pages.length,
    enPages: enPages.length,
    frPages: pages.length - enPages.length,
    brokenLinks,
    brokenMedia,
    hreflang,
    noAlternate: noAlternate.map(routeOf),
    agentMismatch: agentMismatch.map(routeOf),
    heaviest: weights.slice(0, 3),
    distSize,
    videoSize,
    generated: generated.length,
    deps: Object.keys(pkg.dependencies || {}),
    packageManager: pkg.packageManager || '(non épinglé)',
    sitemap,
    figures: figures.map((v, i) => `${v} ${labels[i] || ''}`.trim()),
  };
}

function render(a) {
  const date = new Date().toISOString().slice(0, 10);
  const ok = (n) => (n === 0 ? '✅ 0' : `⚠️ ${n}`);
  const list = (arr) => (arr.length ? arr.join(', ') : 'aucune');

  return `${START}

_Dernière vérification : ${date} — régénéré par \`pnpm run build\`._

| Indicateur | Valeur |
|---|---|
| Pages générées | **${a.pages}** (${a.frPages} FR / ${a.enPages} EN) |
| Liens internes cassés | ${ok(a.brokenLinks)} |
| Médias cassés | ${ok(a.brokenMedia)} |
| Balises hreflang | ${a.hreflang} |
| Pages sans alternative de langue | ${list(a.noAlternate)} |
| Agent IA aligné sur la langue | ${a.agentMismatch.length === 0 ? `✅ ${a.pages}/${a.pages}` : `⚠️ échecs : ${list(a.agentMismatch)}`} |
| URLs dans le sitemap | ${a.sitemap} |
| Poids total \`dist\` | ${mb(a.distSize)} (dont ${mb(a.videoSize)} de vidéo) |
| Variantes d'images générées | ${a.generated} |
| Dépendances | ${a.deps.join(', ')} |
| Gestionnaire de paquets | ${a.packageManager} |

**Chiffres affichés sur le site** — ${a.figures.join(' · ')}

**Pages les plus lourdes au premier rendu** — ${a.heaviest.map((h) => `\`${h.route}\` ${kb(h.weight)}`).join(' · ')}

${END}`;
}

try {
  if (!fs.existsSync('dist')) {
    console.log('[fiche projet] dist/ absent, rien à mettre à jour.');
    process.exit(0);
  }
  const file = 'CLAUDE.md';
  if (!fs.existsSync(file)) {
    console.log('[fiche projet] CLAUDE.md absent, rien à mettre à jour.');
    process.exit(0);
  }

  const content = fs.readFileSync(file, 'utf8');
  const from = content.indexOf(START);
  const to = content.indexOf(END);
  if (from === -1 || to === -1) {
    console.log('[fiche projet] marqueurs AUTO absents de CLAUDE.md, section laissée intacte.');
    process.exit(0);
  }

  const updated = content.slice(0, from) + render(analyse()) + content.slice(to + END.length);
  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log('[fiche projet] CLAUDE.md mis à jour.');
  } else {
    console.log('[fiche projet] CLAUDE.md déjà à jour.');
  }
} catch (err) {
  // Ne jamais faire échouer un build à cause de la documentation.
  console.log('[fiche projet] mise à jour ignorée :', err.message);
}
