// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://plataforma.jayaroberta.com.br',
  output: 'static',
  integrations: [
    sitemap({
      // Guias estáticos servidos de public/ não passam pelo roteador do Astro.
      customPages: [
        'https://plataforma.jayaroberta.com.br/50-comandos/',
        'https://plataforma.jayaroberta.com.br/criativo-ao-conteudo/',
      ],
    }),
  ],
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
