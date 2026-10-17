// Copia o projeto para a pasta passada como argumento, para os testes rodarem
// o Astro lá sem mexer no cache (.astro/) da pasta do projeto (veja tests/copia.ts).
// Uso: node tests/copiar-projeto.mjs /tmp/deadlock-guia-teste/dev
import { cpSync, mkdirSync, rmSync, symlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';

const destino = process.argv[2];
if (!destino) throw new Error('Informe a pasta de destino');
const raiz = resolve(import.meta.dirname, '..');

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });
for (const item of ['src', 'public', 'astro.config.mjs', 'package.json', 'tsconfig.json']) {
  cpSync(join(raiz, item), join(destino, item), { recursive: true });
}
symlinkSync(join(raiz, 'node_modules'), join(destino, 'node_modules'));
