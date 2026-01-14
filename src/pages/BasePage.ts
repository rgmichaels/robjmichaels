import { Page, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async assertUrlIncludes(pathOrFragment: string) {
    const escaped = pathOrFragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.page).toHaveURL(new RegExp(escaped), { timeout: 10_000 });
  }

  async assertVisible(locatorOrRole: ReturnType<Page['locator']>) {
    await expect(locatorOrRole).toBeVisible({ timeout: 10_000 });
  }
}
