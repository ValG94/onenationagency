# Pages retirées du site

Ce dossier est **hors de `src/pages/`**, donc hors routage et hors sitemap :
Astro ne construit que ce qui vit dans `src/pages/`, et `sitemap.xml.ts`
découvre les pages par un glob sur ce même dossier.

## `temoignages.astro` et `en/testimonials.astro` — retirées le 06/09/2026

Ancienne page de témoignages, plus liée depuis la navigation ni le footer,
mais toujours construite et présente dans le sitemap : Google pouvait donc
l'indexer. Elle affichait 4 avis saisis en dur, dont **d'autres citations
d'Alexis Mohamed et de Constantin Etot** que les avis Google désormais
présentés sur l'accueil. Deux propos différents des mêmes personnes
coexistaient sur le site.

La paire correspondante a été retirée de `src/data/routes.ts`, sans quoi le
sitemap aurait continué d'émettre des `hreflang` vers des URL en 404.

**Pour remettre la page en service** : la déplacer dans `src/pages/` en
conservant l'arborescence, puis rétablir la paire dans `routes.ts`. Les
imports relatifs sont déjà à la bonne profondeur. Il faudra alors
l'alimenter depuis `src/data/testimonials.ts` plutôt que de réintroduire
des avis en dur, sous peine de recréer la contradiction.

## Pages d'expertise de la V1 — retirées le 20/10/2026

`afrique`, `conseil-strategique`, `design-graphique`, `e-reputation`,
`referencement`, `relations-presse`, `reseaux-sociaux`, `webmarketing` et
leurs huit équivalents dans `en/` (`africa`, `strategic-consulting`,
`graphic-design`, `online-reputation`, `seo`, `press-relations`,
`social-media`, `digital-marketing`).

Pages de la première version du site. Le menu actuel ne les proposait plus,
mais elles restaient construites, présentes au sitemap et au plan du site,
et joignables par le pied de page et le premier pilier de l'accueil. Les
expertises vivent désormais dans les sections ancrées de `/services`
(`#communication`, `#ia`, `#web`).

- Paires retirées de `src/data/routes.ts`.
- **Redirections 301** dans `vercel.json` : communication, Afrique,
  réseaux sociaux et webmarketing vers `/services#communication`, design
  graphique et référencement vers `/services#web`, mêmes cibles en anglais.
  Les anciennes URL sont indexées par Google : ne pas retirer ces
  redirections, sous peine de 404.
- Images qu'elles étaient seules à utiliser (fonds dans `public/`, bannières
  dans `public/images/*-banner.jpg`, visuels dans `src/assets/`) : laissées
  en place, nettoyage à décider à part.

**Pour remettre une page en service** : la déplacer dans `src/pages/` en
conservant l'arborescence, rétablir sa paire dans `routes.ts` (avec `label`
et `group`) et **supprimer ses redirections** dans `vercel.json`, qui
l'emporteraient sur la page.
