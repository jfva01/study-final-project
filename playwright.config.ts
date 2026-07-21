import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true, /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI, /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: process.env.CI ? 2 : 0, /* Retry on CI only */
  workers: process.env.CI ? 1 : 3, /* Opt out of parallel tests on CI. */
  reporter: 'html', /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  
  use: {/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    trace: 'on-first-retry', /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  projects: [ /* Configure projects for major browsers */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  
  webServer: { /* Run your local dev server before starting the tests */
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
