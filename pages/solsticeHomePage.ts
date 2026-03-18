import { expect, type Locator, type Page } from "@playwright/test";

import { APP_ROOT_URL } from "../utils/testData";

export class SolsticeHomePage {
  readonly page: Page;
  readonly connectWalletButton: Locator;
  readonly sidebarToggleButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.connectWalletButton = page.getByRole("button", { name: "Connect Your Wallet" });
    this.sidebarToggleButton = page.getByRole("button", { name: "Toggle Sidebar" });
  }

  async goto(): Promise<void> {
    await this.page.goto(APP_ROOT_URL, { waitUntil: "domcontentloaded" });
  }

  async expectLandingReady(): Promise<void> {
    await expect(this.page).toHaveTitle(/Solstice/i);
    await expect(this.connectWalletButton).toBeVisible();
  }

  navLink(label: string): Locator {
    return this.page.getByRole("link", { name: label });
  }
}
