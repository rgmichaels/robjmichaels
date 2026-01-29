import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I navigate to the contact page', async function () {
  const url = `${this.baseUrl.replace(/\/$/, '')}/contact`;

  const start = Date.now();
  const resp = await this.page.goto(url, { waitUntil: 'load' });
  this.lastNavMs = Date.now() - start;

  // Keep a response reference for later assertions if you want it
  this.lastResponse = resp;
});

Then('the contact page should respond successfully', async function () {
  // If we got a response object, it should be OK (2xx/3xx)
  if (this.lastResponse) {
    expect(this.lastResponse.ok()).toBeTruthy();
  }

  await expect(this.page).toHaveURL(/\/contact\/?$/);
});

Then('the contact page should load in under {int} seconds', async function (seconds: number) {
  const ms = this.lastNavMs ?? 0;
  expect(ms).toBeGreaterThan(0);
  expect(ms).toBeLessThan(seconds * 1000);
});

Then('I should see my contact details on the contact page', async function () {
  // Avoid strict-mode duplicates by taking the first match
  await expect(this.page.locator('text=rgmichaels@gmail.com').first()).toBeVisible();
  await expect(this.page.locator('text=+1-631-559-8296').first()).toBeVisible();
});
