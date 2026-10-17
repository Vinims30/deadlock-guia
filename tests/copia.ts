import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Os servidores dos testes rodam numa cópia do projeto, numa pasta temporária.
// Bug: rodando na pasta do projeto, eles gravavam no mesmo cache (.astro/) que
// o "npm run dev" aberto, um atrapalhava o outro e a página ficava com o
// conteúdo antigo. A cópia é feita por tests/copiar-projeto.mjs.
export const COPIA_PREVIEW = join(tmpdir(), 'deadlock-guia-teste', 'preview');
export const COPIA_DEV = join(tmpdir(), 'deadlock-guia-teste', 'dev');
