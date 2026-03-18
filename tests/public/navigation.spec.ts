import { test, expect } from "../../fixtures/test";

test.describe("Public navigation quality checks", () => {
  test("docs and support links expose valid href values", async ({ solsticeHomePage }) => {
    await solsticeHomePage.goto();

    const docsLink = solsticeHomePage.navLink("Docs");
    const supportLink = solsticeHomePage.navLink("Support");

    await expect(docsLink).toHaveAttribute("href", /https?:\/\//);
    await expect(supportLink).toHaveAttribute("href", /https?:\/\//);
  });

  test("connect wallet button stays accessible after sidebar toggle", async ({
    solsticeHomePage,
  }) => {
    await solsticeHomePage.goto();

    await solsticeHomePage.sidebarToggleButton.click();
    await expect(solsticeHomePage.connectWalletButton).toBeVisible();
    await solsticeHomePage.sidebarToggleButton.click();
    await expect(solsticeHomePage.connectWalletButton).toBeVisible();
  });
});
