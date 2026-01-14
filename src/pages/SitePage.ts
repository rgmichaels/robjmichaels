import { Page, expect } from '@playwright/test';

export class SitePage {
  constructor(protected page: Page) {}

  async assertUrlIncludes(path: string) {
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.page).toHaveURL(new RegExp(escaped), {
      timeout: 10_000,
    });
  }

  async assertUrlEndsWith(path: string) {
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.page).toHaveURL(new RegExp(`${escaped}$`), {
      timeout: 10_000,
    });
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
