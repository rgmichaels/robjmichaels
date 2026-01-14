import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  static readonly path = '/contact';

  constructor(page: Page) {
    super(page);
  }

  heading() {
    return this.page.getByRole('heading', { level: 1 });
  }

  // If you have a form, these are good accessible locators:
  nameField() {
    return this.page.getByLabel(/name/i);
  }

  emailField() {
    return this.page.getByLabel(/email/i);
  }

  messageField() {
    return this.page.getByLabel(/message/i);
  }

  submitButton() {
    return this.page.getByRole('button', { name: /send|submit/i });
  }

  async assertLoaded() {
    await this.assertUrlIncludes(ContactPage.path);
    await this.assertVisible(this.heading());
  }
}
