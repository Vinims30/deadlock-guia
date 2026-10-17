import { defineConfig } from '@playwright/test';
import { COPIA_PREVIEW, COPIA_DEV } from './tests/copia';

// Testes de regressão: cada teste em tests/ corresponde a um bug que já aconteceu.
// Rodam contra o site gerado (npm run build), servido pelo astro preview.
// Os dois servidores rodam numa cópia do projeto (veja tests/copia.ts).
// Usa o Chromium instalado no sistema, sem baixar outro navegador.
const chromium = process.env.CHROMIUM_PATH ?? '/usr/bin/chromium';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4322/deadlock-guia/',
    launchOptions: { executablePath: chromium },
  },
  projects: [
    { name: 'padrao', testIgnore: /(gpu|dev)\.spec/ },
    // Testes do servidor de desenvolvimento (npm run dev)
    { name: 'dev', testMatch: /dev\.spec/ },
    {
      // Bug: imagens com destaque em branco no Chromium com placa de vídeo
      name: 'gpu',
      testMatch: /gpu\.spec/,
      use: { launchOptions: { executablePath: chromium, args: ['--enable-gpu', '--ignore-gpu-blocklist'] } },
    },
  ],
  // O Astro roda os servidores em segundo plano quando detecta um agente de IA
  // (como o Claude Code); sem essas variáveis eles ficam em primeiro plano.
  webServer: [
    {
      command: `node tests/copiar-projeto.mjs ${COPIA_PREVIEW} && cd ${COPIA_PREVIEW} && npx astro build && env -u CLAUDECODE -u CLAUDE_CODE_ENTRYPOINT -u AI_AGENT npx astro preview --port 4322`,
      url: 'http://localhost:4322/deadlock-guia/',
      reuseExistingServer: false,
      timeout: 180_000,
    },
    {
      // Servidor de desenvolvimento separado, para não depender do npm run dev aberto
      command: `node tests/copiar-projeto.mjs ${COPIA_DEV} && cd ${COPIA_DEV} && env -u CLAUDECODE -u CLAUDE_CODE_ENTRYPOINT -u AI_AGENT npx astro dev --port 4323 --ignore-lock`,
      url: 'http://localhost:4323/deadlock-guia/',
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
