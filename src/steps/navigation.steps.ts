import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the home page', async function () {
  const resp = await this.page.goto(this.baseUrl, { waitUntil: 'load' });
  this.lastResponse = resp;

  if (resp) expect(resp.ok()).toBeTruthy();
});

When('I click the {string} link on the home page', async function (linkText: string) {
  // Use accessible role-based click (stable for nav links)
  await this.page.getByRole('link', { name: linkText, exact: true }).click();
});

Then('I should be on {string}', async function (path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  await expect(this.page).toHaveURL(new RegExp(`${normalized.replace('/', '\\/')}/?$`));
});

Then('the destination page should load', async function () {
  // Basic signal that page content exists and load completed
  await this.page.waitForLoadState('domcontentloaded');
  const title = await this.page.title();
  expect(title.length).toBeGreaterThan(0);
});
