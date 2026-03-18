import { test, expect } from "@playwright/test";

import { APP_ROOT_URL } from "../../utils/testData";

test.describe("Public endpoint checks", () => {
  test("app root is reachable without private credentials", async ({ request }) => {
    const response = await request.get(APP_ROOT_URL, {
      timeout: 20_000,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBeLessThan(400);
  });
});
