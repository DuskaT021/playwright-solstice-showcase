import { expect, type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly myPositionsTab: Locator;
  readonly transparencyTab: Locator;
  readonly viewDuneButton: Locator;
  readonly connectWalletButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myPositionsTab = page.getByRole("button", { name: "My Positions" });
    this.transparencyTab = page.getByRole("button", { name: "Transparency" });
    this.viewDuneButton = page.getByRole("button", {
      name: "View more on Dune.com",
    });
    this.connectWalletButton = page.getByRole("button", {
      name: "Connect Your Wallet",
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  }

  async expectDashboardReady(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard/);
    await expect(this.myPositionsTab).toBeVisible();
    await expect(this.transparencyTab).toBeVisible();
  }

  heading(name: string): Locator {
    return this.page.getByRole("heading", { name, level: 3 });
  }
}
