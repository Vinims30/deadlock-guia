// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// O site vai ficar em https://vinims30.github.io/deadlock-guia
export default defineConfig({
  site: 'https://vinims30.github.io',
  base: '/deadlock-guia',
  integrations: [mdx()],
});