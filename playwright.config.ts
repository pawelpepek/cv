import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      // Smoke + a11y tests against the dev server (client-side behavior).
      name: 'chromium',
      testIgnore: 'prerender.spec.ts',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4200' },
    },
    {
      // Same client-side suite on WebKit — recruiters often open the link in Safari/iOS.
      name: 'webkit',
      testIgnore: 'prerender.spec.ts',
      use: { ...devices['Desktop Safari'], baseURL: 'http://localhost:4200' },
    },
    {
      // Prerender tests against the static production build (see serve-dist.mjs).
      name: 'prerender',
      testMatch: 'prerender.spec.ts',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4201' },
    },
  ],
  webServer: [
    {
      command: 'npm start',
      url: 'http://localhost:4200',
      reuseExistingServer: !process.env['CI'],
      timeout: 120_000,
    },
    {
      command: 'node e2e/serve-dist.mjs',
      url: 'http://localhost:4201',
      reuseExistingServer: !process.env['CI'],
      // Generous timeout: serve-dist.mjs runs a full build when dist is missing.
      timeout: 300_000,
    },
  ],
});
