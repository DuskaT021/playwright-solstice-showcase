import { expect, type Locator, type Page } from "@playwright/test";

export class SwapPage {
  readonly page: Page;
  readonly swapHeading: Locator;
  readonly halfButton: Locator;
  readonly maxButton: Locator;
  readonly advancedButton: Locator;
  readonly connectWalletButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.swapHeading = page.getByText("Swap").first();
    this.halfButton = page.getByRole("button", { name: "Half" });
    this.maxButton = page.getByRole("button", { name: "Max" });
    this.advancedButton = page.getByRole("button", { name: /Advanced/ });
    this.connectWalletButton = page.getByRole("button", {
      name: "Connect Your Wallet",
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("/swap", { waitUntil: "domcontentloaded" });
  }

  async expectSwapReady(): Promise<void> {
    await expect(this.page).toHaveURL(/\/swap/);
    await expect(this.swapHeading).toBeVisible();
  }
}
