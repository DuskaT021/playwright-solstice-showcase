import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
  ],
  use: {
    baseURL: "https://app.solstice.finance",
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    navigationTimeout: 20_000,
    actionTimeout: 10_000,
  },
  outputDir: "test-results/artifacts",
  projects: [
    {
      name: "public-chromium",
      testMatch: /tests\/public\/.*\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "public-firefox",
      testMatch: /tests\/public\/.*\.spec\.ts/,
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "public-webkit",
      testMatch: /tests\/public\/.*\.spec\.ts/,
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "public-mobile-chromium",
      testMatch: /tests\/public\/.*\.spec\.ts/,
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "wallet-mock-chromium",
      testMatch: /tests\/wallet-mock\/.*\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "api-smoke",
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
