import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import type { PWWorld } from './world';

Before(async function (this: PWWorld) {
  this.browser = await chromium.launch({
    headless: true, // set false for local debug
  });

  this.context = await this.browser.newContext();
  const page = await this.context.newPage();

  // Bind world + page objects
  this.bindPages(page);
});

After(async function (this: PWWorld) {
  // Close in reverse order, safely
  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});
  await this.browser?.close().catch(() => {});
});
