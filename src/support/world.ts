import { setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page, Response } from '@playwright/test';

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
   * Stores the result of the most recent navigation.
   * Used for performance and response assertions.
   */
  lastNavigation?: {
    durationMs: number;
    status: number;
    ok: boolean;
    response: Response | null;
  };

  /**
   * Rebind all page objects to the active Playwright Page.
   * Call this whenever the page changes (e.g. popup / new tab).
   */
  bindPages(page: Page): void {
    this.page = page;

    this.sitePage = new SitePage(this.page);
    this.resumePage = new ResumePage(this.page);
    this.portfolioPage = new PortfolioPage(this.page);
    this.contactPage = new ContactPage(this.page);
  }
}

setWorldConstructor(PWWorld);
