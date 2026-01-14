import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SitePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoHome() {
    await this.page.goto('https://robjmichaels.com/', { waitUntil: 'domcontentloaded' });
  }

  navLink(name: 'Resume' | 'Portfolio' | 'Contact') {
    return this.page.getByRole('link', { name });
  }

  async clickNav(name: 'Resume' | 'Portfolio' | 'Contact') {
    await this.navLink(name).click();
    await this.waitForReady();
  }
}
