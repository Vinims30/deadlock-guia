// @ts-check
import { defineConfig } from 'astro/config';
import { existsSync, utimesSync } from 'node:fs';

import mdx from '@astrojs/mdx';

// Corrige um defeito do servidor de desenvolvimento: ao trocar um capítulo .md
// por um .mdx com o mesmo nome (ou o contrário), o aviso de "arquivo apagado"
// às vezes chega depois do "arquivo criado" e o Astro tira o capítulo novo do
// ar (a página dá 404). Quando um capítulo é apagado e existe o irmão com a
// outra extensão, tocamos o irmão para o Astro carregá-lo de novo.
/** @returns {import('vite').Plugin} */
function recarregarCapituloTrocado() {
  return {
    name: 'recarregar-capitulo-trocado',
    configureServer(server) {
      server.watcher.on('unlink', (arquivo) => {
        if (!arquivo.includes('/src/content/capitulos/')) return;
        const irmao = arquivo.endsWith('.mdx') ? arquivo.slice(0, -1) : arquivo.endsWith('.md') ? `${arquivo}x` : null;
        if (!irmao) return;
        setTimeout(() => {
          if (!existsSync(irmao)) return;
          const agora = new Date();
          utimesSync(irmao, agora, agora);
        }, 300);
      });
    },
  };
}

// O site vai ficar em https://vinims30.github.io/deadlock-guia
export default defineConfig({
  site: 'https://vinims30.github.io',
  base: '/deadlock-guia',
  integrations: [mdx()],
  vite: { plugins: [recarregarCapituloTrocado()] },
});
