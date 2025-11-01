import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e", // <-- Your E2E tests folder
  timeout: 30 * 1000, // 30 seconds per test
  expect: {
    timeout: 5000,
  },

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Limit the number of workers on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [["list"], ["html", { open: "never" }]],

  // Shared browser context settings
  use: {
    baseURL: "http://localhost:3000", // or wherever Next.js runs locally
    trace: "on-first-retry", // Capture traces for failing tests
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
  },

  // Browser projects
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // Web server configuration
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI, // don't restart if running locally
  },
});
