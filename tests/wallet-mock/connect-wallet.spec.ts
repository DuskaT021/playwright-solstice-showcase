import { test, expect } from "@playwright/test";

import { installMockWallet } from "./mockWallet";

test.describe("Mocked wallet flows @wallet-mock", () => {
  test("injects EIP-1193 provider and responds to account requests", async ({ page }) => {
    await installMockWallet(page);
    await page.goto("https://app.solstice.finance/", { waitUntil: "domcontentloaded" });

    const hasEthereumProvider = await page.evaluate(() => Boolean(window.ethereum));
    expect(hasEthereumProvider).toBeTruthy();

    const accountResult = await page.evaluate(async () => {
      const result = await window.ethereum?.request?.({ method: "eth_requestAccounts" });
      return Array.isArray(result) ? result[0] : null;
    });

    expect(accountResult).toBe("0x1111111111111111111111111111111111111111");
  });

  test("connect wallet CTA remains visible with mocked provider", async ({ page }) => {
    await installMockWallet(page);
    await page.goto("https://app.solstice.finance/", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("button", { name: "Connect Your Wallet" })).toBeVisible();
  });
});
