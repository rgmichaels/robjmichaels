import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

Before(async function () {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error(
      'BASE_URL env var is required. Example:\n' +
        '  BASE_URL=https://robjmichaels.com npx cucumber-js --tags "@smoke"'
    );
  }

  this.baseUrl = baseUrl;

  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});
  await this.browser?.close().catch(() => {});
});
