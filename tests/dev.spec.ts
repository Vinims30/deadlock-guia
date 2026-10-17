import { test, expect } from '@playwright/test';
import { writeFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { COPIA_DEV } from './copia';

// Testes do servidor de desenvolvimento (npm run dev), que roda na porta 4323,
// numa cópia do projeto (veja tests/copia.ts). Os arquivos são criados na cópia.
//
// Bug: ao trocar um capítulo .md por um .mdx com o mesmo nome, a página dava
// 404 no servidor de desenvolvimento e não voltava sozinha (o site gerado
// ficava certo). A correção é o plugin recarregarCapituloTrocado no astro.config.mjs.

const DEV = 'http://localhost:4323/deadlock-guia/';
const BASE = join(COPIA_DEV, 'src/content/capitulos/08-glossario/99-teste-automatico');
const URL = `${DEV}glossario/teste-automatico`;
const conteudo = (texto: string) => `---\ntitulo: "Teste automático"\n---\n\n${texto}\n`;

// Espera até a página estar no ar com o texto esperado (até 10 segundos)
async function esperarTexto(request: import('@playwright/test').APIRequestContext, texto: string) {
  for (let i = 0; i < 20; i++) {
    const r = await request.get(URL);
    if (r.status() === 200 && (await r.text()).includes(texto)) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

test('trocar um capítulo .md por .mdx não tira a página do ar', async ({ request }) => {
  try {
    writeFileSync(`${BASE}.md`, conteudo('versão md'));
    expect(await esperarTexto(request, 'versão md'), 'capítulo .md no ar').toBe(true);

    rmSync(`${BASE}.md`);
    writeFileSync(`${BASE}.mdx`, conteudo('versão mdx'));
    expect(await esperarTexto(request, 'versão mdx'), 'capítulo .mdx no ar depois da troca').toBe(true);
    // O bug tirava a página do ar alguns instantes depois; confere que ela continua
    await new Promise((r) => setTimeout(r, 3000));
    expect((await request.get(URL)).status(), 'capítulo .mdx continua no ar').toBe(200);
  } finally {
    for (const ext of ['.md', '.mdx']) if (existsSync(BASE + ext)) rmSync(BASE + ext);
  }
});
