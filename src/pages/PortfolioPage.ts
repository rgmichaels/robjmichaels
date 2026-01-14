import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PortfolioPage extends BasePage {
  static readonly path = '/portfolio';

  constructor(page: Page) {
    super(page);
  }

  heading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  // Example: cards/projects list
  projectCards() {
    return this.page.locator('[data-testid="project-card"]');
  }

  async assertLoaded() {
    await this.assertUrlIncludes(PortfolioPage.path);
    await this.assertVisible(this.heading());
  }
}
