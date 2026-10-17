import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { secoes } from '../src/secoes';

// Bug: um capítulo citava outro por um nome errado ("veja *Pensando builds*",
// mas o título é "Pensando uma build"). Este teste confere que toda citação
// no formato "veja *Título*", "em *Título*" ou "para *Título*" aponta para
// um capítulo ou uma seção que existe.

const PASTA = 'src/content/capitulos';

function arquivos(pasta: string): string[] {
  return readdirSync(pasta, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? arquivos(join(pasta, e.name)) : /\.mdx?$/.test(e.name) ? [join(pasta, e.name)] : [],
  );
}

test('citações entre capítulos usam títulos que existem', () => {
  const todos = arquivos(PASTA);
  const titulos = new Set(secoes.map((s) => s.titulo));
  for (const arquivo of todos) {
    const titulo = readFileSync(arquivo, 'utf8').match(/titulo: "([^"]+)"/)?.[1];
    if (titulo) titulos.add(titulo);
  }
  const erradas: string[] = [];
  for (const arquivo of todos) {
    const texto = readFileSync(arquivo, 'utf8');
    for (const [, nome] of texto.matchAll(/(?:veja|em|para) \*([^*]+)\*/g)) {
      if (!titulos.has(nome)) erradas.push(`${arquivo}: "${nome}"`);
    }
  }
  expect(erradas).toEqual([]);
});
