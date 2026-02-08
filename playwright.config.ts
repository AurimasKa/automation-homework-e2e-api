/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';
import { env, defaultBaseUrl } from './env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  timeout: process.env.CI ? 60_000 : 40_000,
  expect: { timeout: 15_000 },
  reporter: process.env.CI
    ? [
        ['github'],
        ['html', { outputFolder: 'test-reports' }],
        ['json', { outputFile: 'test-reports/results.json' }],
        ['junit', { outputFile: 'test-reports/junit.xml' }],
        ['line']
      ]
    : [
        ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
        ['list']
      ],
  use: {
    trace: 'retain-on-failure',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    headless: process.env.CI ? true : false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: {},
    },
    {
      name: 'chromium',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: env.BASE_URL ?? defaultBaseUrl,
      },
    },
  ],
});
