// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://plataforma.jayaroberta.com.br',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // Inline small stylesheets so first paint needs no extra request.
    inlineStylesheets: 'always',
  },
  image: {
    // Layout defaults for astro:assets <Picture>.
    responsiveStyles: false,
  },
  prefetch: false,
  devToolbar: { enabled: false },
});
