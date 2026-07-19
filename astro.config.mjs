import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Domaine de production : sert de base aux URL absolues.
  site: 'https://www.onenationagency.com',
  outDir: './dist',
  // Aucune intégration UI : le site est 100 % statique.
  // (@astrojs/react a été retiré avec le dernier composant React.)
  integrations: [],
});
