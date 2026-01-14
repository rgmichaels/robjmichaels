import { setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';

import { SitePage } from '../pages/SitePage';
import { ResumePage } from '../pages/ResumePage';
import { PortfolioPage } from '../pages/PortfolioPage';
import { ContactPage } from '../pages/ContactPage';

export class PWWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Page Objects
  sitePage!: SitePage;
  resumePage!: ResumePage;
  portfolioPage!: PortfolioPage;
  contactPage!: ContactPage;

  /**
   * Call this anytime page changes (e.g., popup/new tab)
   * so all page objects point at the current Page.
   */
  bindPages(page: Page) {
    this.page = page;
    this.sitePage = new SitePage(this.page);
    this.resumePage = new ResumePage(this.page);
    this.portfolioPage = new PortfolioPage(this.page);
    this.contactPage = new ContactPage(this.page);
  }
}

setWorldConstructor(PWWorld);
