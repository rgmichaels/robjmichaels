import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I navigate to the home page', async function () {
  await this.page.goto(this.baseUrl, { waitUntil: 'load' });
});

Then('the home page should respond successfully', async function () {
  expect(this.page.url()).toContain(this.baseUrl);
});

Then('the page title should be visible', async function () {
  const title = await this.page.title();
  expect(title.length).toBeGreaterThan(0);
});
