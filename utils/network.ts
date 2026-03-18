import type { APIResponse, Page } from "@playwright/test";

export async function fetchPublicEndpoint(page: Page, url: string): Promise<APIResponse> {
  const response = await page.request.get(url, {
    timeout: 20_000,
  });

  return response;
}

export async function collectFailedRequests(page: Page): Promise<string[]> {
  const failedUrls: string[] = [];
  page.on("requestfailed", (request) => {
    failedUrls.push(request.url());
  });

  return failedUrls;
}
