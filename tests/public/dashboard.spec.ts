import { test, expect } from "@playwright/test";

import { DashboardPage } from "../../pages/dashboardPage";

test.describe("Dashboard page flows", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test("loads dashboard with My Positions and Transparency tabs", async () => {
    await dashboardPage.expectDashboardReady();
  });

  test("displays Dune.com analytics link", async () => {
    await expect(dashboardPage.viewDuneButton).toBeVisible();
  });

  test("shows wallet-gated content message when disconnected", async ({
    page,
  }) => {
    await expect(
      page.getByText("Please connect your wallet to access the full features")
    ).toBeVisible();
  });

  test("renders TVL metric heading", async () => {
    await expect(dashboardPage.page.getByText("TVL")).toBeVisible();
  });
});
