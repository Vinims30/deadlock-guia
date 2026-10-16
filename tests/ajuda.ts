import type { Page } from '@playwright/test';

// Todas as páginas do site: a capa e cada capítulo listado no sumário.
export async function todasAsPaginas(page: Page): Promise<string[]> {
  await page.goto('');
  const links = await page.$$eval('.sumario a', (as) => as.map((a) => (a as HTMLAnchorElement).pathname));
  const base = '/deadlock-guia/';
  return ['', ...links.map((l) => l.replace(base, ''))];
}

// Rola a página inteira para as imagens com carregamento preguiçoso carregarem
export async function rolarTudo(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
}

// Espera todas as imagens da página terminarem de carregar
export async function esperarImagens(page: Page) {
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((r) => img.addEventListener('load', r, { once: true })),
      ),
    ),
  );
}
