import { test, expect } from '@playwright/test';
import { todasAsPaginas, rolarTudo, esperarImagens } from './ajuda';

// Cada teste aqui corresponde a um bug que já aconteceu no site.
// Quando aparecer um bug novo, adicione um teste que falharia com ele.
//
// Bug coberto pelo próprio "npm run build" (que roda antes dos testes):
// título com dois-pontos sem aspas no cabeçalho de um capítulo quebrava o build.

const CAPITULO_INTERFACE = 'primeiros-passos/controles-e-interface';

test('todas as páginas abrem e os links de anterior/próximo funcionam', async ({ page, request }) => {
  // Bug: o capítulo 1.1 dava erro 500 (arquivo novo que o servidor não achava)
  const paginas = await todasAsPaginas(page);
  expect(paginas.length).toBeGreaterThan(10);
  const vistos = new Set<string>();
  for (const p of paginas) {
    const resposta = await request.get(p);
    expect(resposta.status(), `página "${p}"`).toBe(200);
    if (!p) continue;
    await page.goto(p);
    for (const href of await page.$$eval('.navegacao a', (as) => as.map((a) => (a as HTMLAnchorElement).href))) {
      if (vistos.has(href)) continue;
      vistos.add(href);
      expect((await request.get(href)).status(), `link ${href} em "${p}"`).toBe(200);
    }
  }
});

test('todas as imagens carregam', async ({ page }) => {
  for (const p of await todasAsPaginas(page)) {
    await page.goto(p);
    await rolarTudo(page);
    await esperarImagens(page);
    const quebradas = await page.$$eval('img', (imgs) =>
      imgs.filter((i) => (i as HTMLImageElement).naturalWidth === 0).map((i) => (i as HTMLImageElement).src),
    );
    expect(quebradas, `imagens quebradas em "${p}"`).toEqual([]);
  }
});

for (const [largura, altura] of [
  [320, 640],
  [360, 780],
  [390, 844],
  [768, 1024],
  [1280, 800],
  [1920, 1080],
  [2560, 1440],
]) {
  test(`sem rolagem horizontal em ${largura}px`, async ({ page }) => {
    // Bugs: imagens com destaque passavam da tela em 1280px (estilo do componente
    // sobrescrevia a margem das imagens largas em telas grandes)
    await page.setViewportSize({ width: largura, height: altura });
    for (const p of await todasAsPaginas(page)) {
      await page.goto(p);
      const sobra = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(sobra, `"${p}" em ${largura}px`).toBeLessThanOrEqual(0);
    }
  });
}

test('zoom de imagem comum ocupa boa parte da tela', async ({ page }) => {
  // Bugs: o zoom mostrava um quadradinho no meio (SVG sem tamanho) e depois uma tela preta
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const p of await todasAsPaginas(page)) {
    await page.goto(p);
    const imagens = page.locator('.prosa img:not(.retrato)');
    const total = await imagens.count();
    for (let i = 0; i < total; i++) {
      const img = imagens.nth(i);
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((el) => (el as HTMLImageElement).decode().catch(() => {}));
      await img.click();
      const caixa = page.locator('dialog.ampliar[open] .ampliada');
      await expect(caixa).toBeVisible();
      const medida = await caixa.evaluate(async (el) => {
        const im = el.querySelector('img') as HTMLImageElement;
        await im.decode().catch(() => {});
        return { largura: el.getBoundingClientRect().width, carregou: im.naturalWidth > 0 };
      });
      expect(medida.carregou, `imagem ${i} de "${p}" carregou no zoom`).toBe(true);
      expect(medida.largura, `imagem ${i} de "${p}" grande no zoom`).toBeGreaterThan(600);
      await page.keyboard.press('Escape');
    }
  }
});

test('zoom de imagem com destaque mostra a imagem inteira e o destaque', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(CAPITULO_INTERFACE);
  const quadros = page.locator('.prosa .quadro');
  const total = await quadros.count();
  expect(total).toBeGreaterThan(5);
  for (let i = 0; i < total; i++) {
    await quadros.nth(i).scrollIntoViewIfNeeded();
    await quadros.nth(i).click();
    const caixa = page.locator('dialog.ampliar[open] .ampliada');
    await expect(caixa).toBeVisible();
    const r = await caixa.evaluate(async (el) => {
      const im = el.querySelector('img') as HTMLImageElement;
      await im.decode().catch(() => {});
      return { largura: el.getBoundingClientRect().width, carregou: im.naturalWidth > 0 };
    });
    expect(r.carregou, `destaque ${i}`).toBe(true);
    expect(r.largura, `destaque ${i}`).toBeGreaterThan(1000);
    await page.keyboard.press('Escape');
  }
});

test('no celular em pé o zoom é maior que a tela e começa no destaque', async ({ page }) => {
  // Bug: no celular em pé, o zoom ficava do mesmo tamanho da página
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto(CAPITULO_INTERFACE);
  const minimapa = page.locator('figure.interface', { hasText: 'O minimapa' }).locator('.quadro');
  await minimapa.scrollIntoViewIfNeeded();
  await minimapa.click();
  const caixa = page.locator('dialog.ampliar[open] .ampliada');
  await expect(caixa).toBeVisible();
  expect((await caixa.boundingBox())!.width).toBeGreaterThan(360 * 2);
  // O contorno do destaque precisa estar visível na tela logo ao abrir
  const contorno = await caixa.locator('span').first().boundingBox();
  const centro = contorno!.x + contorno!.width / 2;
  expect(centro).toBeGreaterThan(0);
  expect(centro).toBeLessThan(360);
});

test('destaques pequenos aparecem aproximados', async ({ page }) => {
  // Bug: os ícones de ultimate ficavam minúsculos (sem zoom na faixa)
  await page.goto(CAPITULO_INTERFACE);
  const medidas = await page.$$eval('.prosa .quadro', (qs) =>
    qs
      .filter((q) => q.querySelector('span'))
      .map((q) => {
        const a = q.getBoundingClientRect();
        const s = q.querySelector('span')!.getBoundingClientRect();
        return { nome: q.getAttribute('aria-label'), proporcao: Math.max(s.width / a.width, s.height / a.height) };
      }),
  );
  for (const m of medidas) expect(m.proporcao, `"${m.nome}"`).toBeGreaterThanOrEqual(0.25);
});

test('destaques sem SVG e sem imagem gigante escondida', async ({ page }) => {
  // Bug: com placa de vídeo, o Chromium deixava em branco as imagens com destaque
  // desenhadas com SVG ou com uma imagem muito maior que o quadro (ver gpu.spec.ts)
  await page.goto(CAPITULO_INTERFACE);
  expect(await page.locator('.quadro svg').count()).toBe(0);
  const gigantes = await page.$$eval('.quadro', (qs) =>
    qs.filter((q) => [...q.querySelectorAll('*')].some((f) => f.getBoundingClientRect().width > q.getBoundingClientRect().width * 1.5)).length,
  );
  expect(gigantes).toBe(0);
});

test('avisos de pendência não aparecem no site publicado', async ({ page }) => {
  for (const p of await todasAsPaginas(page)) {
    await page.goto(p);
    expect(await page.locator('.pendente').count(), `"${p}"`).toBe(0);
  }
});

test('ícone de herói não abre zoom', async ({ page }) => {
  await page.goto('primeiros-passos/herois-para-comecar');
  const icone = page.locator('.retrato').first();
  await icone.click();
  await expect(page.locator('dialog.ampliar[open]')).toHaveCount(0);
});
