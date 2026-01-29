import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I navigate to the home page', async function () {
  const resp = await this.page.goto(this.baseUrl, { waitUntil: 'load' });
  this.lastResponse = resp;
});

Then('the home page should respond successfully', async function () {
  if (this.lastResponse) {
    expect(this.lastResponse.ok()).toBeTruthy();
  }
  await expect(this.page).toHaveURL(/\/$/);
});

Then('the page title should be visible', async function () {
  const title = await this.page.title();
  expect(title.length).toBeGreaterThan(0);
});

Then('the home page should load successfully', async function () {
  // “Load successfully” should assert something real but stable
  await expect(this.page.locator('text=Quality Assurance').first()).toBeVisible();
});

Then('I should see the professional summary text', async function () {
  // This text is currently on your home page (robjmichaels.com)
  const snippet =
    'Senior software quality professional with extensive experience owning quality outcomes across complex SaaS platforms';

  await expect(this.page.getByText(snippet, { exact: false })).toBeVisible();
});
