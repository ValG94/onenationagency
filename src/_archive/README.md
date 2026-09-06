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
