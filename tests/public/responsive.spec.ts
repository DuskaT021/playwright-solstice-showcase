import { test, expect } from "../../fixtures/test";

test.describe("Responsive public behavior", () => {
  test("mobile viewport still shows global navigation entry points", async ({
    page,
    solsticeHomePage,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await solsticeHomePage.goto();

    await expect(solsticeHomePage.sidebarToggleButton).toBeVisible();
    await expect(solsticeHomePage.connectWalletButton).toBeVisible();
  });
});
