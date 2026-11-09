import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Domaine de production : sert de base aux URL absolues.
  site: 'https://www.onenationagency.com',
  outDir: './dist',
  // Compression des espaces « sans perte », celle d'Astro 5. Le mode par
  // défaut d'Astro 7 ('jsx') supprime l'espace entre un texte et l'élément
  // de la ligne suivante : « Agency.Tous droits », flèches collées.
  compressHTML: true,
  // Aucune intégration UI : le site est 100 % statique.
  // (@astrojs/react a été retiré avec le dernier composant React.)
  integrations: [],
});
