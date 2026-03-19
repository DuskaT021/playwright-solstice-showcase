import { test, expect } from "@playwright/test";

import { SwapPage } from "../../pages/swapPage";

test.describe("Swap page flows", () => {
  let swapPage: SwapPage;

  test.beforeEach(async ({ page }) => {
    swapPage = new SwapPage(page);
    await swapPage.goto();
  });

  test("loads swap interface with form controls", async () => {
    await swapPage.expectSwapReady();
  });

  test("displays Half and Max balance buttons", async () => {
    await expect(swapPage.halfButton).toBeVisible();
    await expect(swapPage.maxButton).toBeVisible();
  });

  test("shows Advanced settings toggle", async () => {
    await expect(swapPage.advancedButton).toBeVisible();
  });

  test("displays Connect Your Wallet CTA when disconnected", async () => {
    await expect(swapPage.connectWalletButton).toBeVisible();
  });

  test("shows Deep DeFi promotional section", async ({ page }) => {
    await expect(page.getByText("Deep DeFi").first()).toBeVisible();
  });
});
