import { defineConfig } from '@playwright/test';

// Testes de regressão: cada teste em tests/ corresponde a um bug que já aconteceu.
// Rodam contra o site gerado (npm run build), servido pelo astro preview.
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
    { name: 'padrao', testIgnore: /gpu\.spec/ },
    {
      // Bug: imagens com destaque em branco no Chromium com placa de vídeo
      name: 'gpu',
      testMatch: /gpu\.spec/,
      use: { launchOptions: { executablePath: chromium, args: ['--enable-gpu', '--ignore-gpu-blocklist'] } },
    },
  ],
  webServer: {
    // O Astro roda o preview em segundo plano quando detecta um agente de IA
    // (como o Claude Code); sem essas variáveis ele fica em primeiro plano.
    command: 'npm run build && env -u CLAUDECODE -u CLAUDE_CODE_ENTRYPOINT -u AI_AGENT npx astro preview --port 4322',
    url: 'http://localhost:4322/deadlock-guia/',
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
