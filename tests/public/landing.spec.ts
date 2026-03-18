import { test, expect } from "../../fixtures/test";

import {
  EXPECTED_TITLE_KEYWORD,
  PRIMARY_NAV_LINKS,
  SECONDARY_NAV_LINKS,
} from "../../utils/testData";

test.describe("Public landing flows", () => {
  test("loads the Solstice app shell and primary CTA", async ({ solsticeHomePage }) => {
    await solsticeHomePage.goto();
    await solsticeHomePage.expectLandingReady();
    await expect(solsticeHomePage.page).toHaveTitle(new RegExp(EXPECTED_TITLE_KEYWORD, "i"));
  });

  test("renders core and secondary navigation links", async ({ solsticeHomePage }) => {
    await solsticeHomePage.goto();

    for (const navLabel of [...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS]) {
      await expect(solsticeHomePage.navLink(navLabel)).toBeVisible();
    }
  });

  test("contains at least one top-level heading for end-user orientation", async ({
    solsticeHomePage,
  }) => {
    await solsticeHomePage.goto();
    await expect(solsticeHomePage.page.getByRole("heading").first()).toBeVisible();
  });
});
