import { test, expect } from '@playwright/test';
import sharp from 'sharp';
import { rolarTudo } from './ajuda';

// Bug: no Chromium com placa de vídeo, as imagens com destaque do capítulo 1.1
// apareciam em branco (ou com pedaços de outras imagens). Este teste roda com a
// aceleração por GPU ligada, tira print de cada imagem com destaque e confere
// que ela não está branca nem transparente.

test('imagens com destaque aparecem com a placa de vídeo ligada', async ({ page }) => {
  await page.setViewportSize({ width: 1880, height: 945 });
  await page.goto('primeiros-passos/controles-e-interface');
  await rolarTudo(page);
  const figuras = page.locator('figure.interface .quadro');
  const total = await figuras.count();
  for (let i = 0; i < total; i++) {
    const quadro = figuras.nth(i);
    await quadro.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(800);
    // Print da tela como ela aparece (o print só do elemento é desenhado de outro
    // jeito pelo Chromium e não mostrava o bug), recortado na imagem
    const caixa = (await quadro.boundingBox())!;
    const print = await page.screenshot();
    const recorte = {
      left: Math.max(0, Math.round(caixa.x)),
      top: Math.max(0, Math.round(caixa.y)),
      width: Math.round(Math.min(caixa.width, 1880 - caixa.x)),
      height: Math.round(Math.min(caixa.height, 945 - caixa.y)),
    };
    const { data, info } = await sharp(print).extract(recorte).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
    let brancos = 0;
    let transparentes = 0;
    const pixels = info.width * info.height;
    for (let p = 0; p < data.length; p += 4) {
      if (data[p + 3] < 20) transparentes++;
      else if (data[p] > 235 && data[p + 1] > 235 && data[p + 2] > 235) brancos++;
    }
    const nome = await quadro.getAttribute('aria-label');
    expect(transparentes / pixels, `"${nome}" transparente`).toBeLessThan(0.05);
    expect(brancos / pixels, `"${nome}" branco`).toBeLessThan(0.3);
  }
});
