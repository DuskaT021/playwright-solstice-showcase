import { test as base } from "@playwright/test";

import { SolsticeHomePage } from "../pages/solsticeHomePage";

type SolsticeFixtures = {
  solsticeHomePage: SolsticeHomePage;
};

export const test = base.extend<SolsticeFixtures>({
  solsticeHomePage: async ({ page }, use) => {
    await use(new SolsticeHomePage(page));
  },
});

export { expect } from "@playwright/test";
