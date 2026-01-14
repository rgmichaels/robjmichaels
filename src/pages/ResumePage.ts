import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResumePage extends BasePage {
  static readonly path = '/resume';

  constructor(page: Page) {
    super(page);
  }

  // Adjust these selectors to match your actual markup
  // I’m using "heading" because it’s resilient and accessible.
  heading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  downloadLink() {
    return this.page.getByRole('link', { name: /download/i });
  }

  async assertLoaded() {
    // Pick one solid “this page exists” assertion.
    // Update to a heading text you know is on the resume page.
    await this.assertUrlIncludes(ResumePage.path);
    await this.assertVisible(this.heading());
  }
}
