import { defineConfig } from '@playwright/test';

const basePath = process.env.BASE_PATH ?? '';
const siteUrl = `http://127.0.0.1:4173${basePath}/`;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: siteUrl,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    command: 'pnpm preview --host 127.0.0.1 --port 4173',
    url: `${siteUrl}lectures/sample-opening/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
