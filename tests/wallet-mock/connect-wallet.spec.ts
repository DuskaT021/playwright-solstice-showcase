import { test, expect } from "@playwright/test";

import {
  installMockSolanaWallet,
  MOCK_SOLANA_PUBLIC_KEY_BASE58,
} from "./mockSolanaWallet";

test.describe("Mocked Solana wallet flows @wallet-mock", () => {
  test("injects Phantom-shaped provider and connect() returns deterministic public key", async ({
    page,
  }) => {
    await installMockSolanaWallet(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const base58 = await page.evaluate(async () => {
      const provider = window.phantom?.solana ?? window.solana;
      if (!provider) {
        throw new Error("Expected mock Solana provider on window");
      }
      const { publicKey } = await provider.connect();
      return publicKey.toBase58();
    });

    expect(base58).toBe(MOCK_SOLANA_PUBLIC_KEY_BASE58);
  });

  test("connect wallet CTA remains visible with mocked Solana provider", async ({ page }) => {
    await installMockSolanaWallet(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("button", { name: "Connect Your Wallet" }).or(
        page.getByTestId("connect-wallet-button"),
      ),
    ).toBeVisible();
  });
});
