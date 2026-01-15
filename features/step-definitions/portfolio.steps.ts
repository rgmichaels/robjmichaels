import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { PWWorld } from "../../src/support/world";

const PORTFOLIO_PATH = "/portfolio";
const MAX_LOAD_MS = 2000;

Given("I navigate to the portfolio page", async function (this: PWWorld) {
  // Prefer a configured baseURL (your framework might pass it via world parameters)
  const baseURL =
    (this.parameters as any)?.baseURL ||
    process.env.BASE_URL ||
    "https://robjmichaels.com";

  const url = new URL(PORTFOLIO_PATH, baseURL).toString();

  const start = Date.now();
  const response = await this.page.goto(url, { waitUntil: "domcontentloaded" });
  const durationMs = Date.now() - start;

  this.lastNavigation = {
    durationMs,
    status: response?.status() ?? 0,
    ok: response?.ok() ?? false,
    response: response ?? null,
  };
});

Then("the portfolio page should respond successfully", async function (this: PWWorld) {
  expect(this.lastNavigation, "lastNavigation is missing (did you navigate?)").toBeTruthy();

  // Accept 2xx/3xx as "success" for page loads
  expect(this.lastNavigation!.status, `Unexpected status: ${this.lastNavigation!.status}`)
    .toBeGreaterThanOrEqual(200);
  expect(this.lastNavigation!.status, `Unexpected status: ${this.lastNavigation!.status}`)
    .toBeLessThan(400);

  await expect(this.page).toHaveURL(new RegExp("/portfolio/?$"));
});

Then("the portfolio page should load in under 2 seconds", async function (this: PWWorld) {
  expect(this.lastNavigation, "lastNavigation is missing (did you navigate?)").toBeTruthy();

  expect(
    this.lastNavigation!.durationMs,
    `Portfolio page took ${this.lastNavigation!.durationMs}ms (limit ${MAX_LOAD_MS}ms)`
  ).toBeLessThanOrEqual(MAX_LOAD_MS);
});

Then(
  'I should see a LinkedIn link pointing to {string}',
  async function (this: PWWorld, expectedHref: string) {
    const byName = this.page.getByRole("link", { name: /linkedin/i });
    const byHref = this.page.locator('a[href*="linkedin.com"]');

    const locator = (await byName.count()) > 0 ? byName.first() : byHref.first();

    await expect(locator).toBeVisible();
    await expect(locator).toHaveAttribute("href", expectedHref);
  }
);

Then(
  'I should see a GitHub link pointing to {string}',
  async function (this: PWWorld, expectedHref: string) {
    const byName = this.page.getByRole("link", { name: /github/i });
    const byHref = this.page.locator('a[href*="github.com"]');

    const locator = (await byName.count()) > 0 ? byName.first() : byHref.first();

    await expect(locator).toBeVisible();
    await expect(locator).toHaveAttribute("href", expectedHref);
  }
);