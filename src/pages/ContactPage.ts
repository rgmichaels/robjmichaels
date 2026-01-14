import { Page, expect, Response } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  static readonly url = 'https://robjmichaels.com/contact';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the Contact page and measure load time and response.
   */
  async gotoAndMeasure(): Promise<{
    durationMs: number;
    status: number;
    ok: boolean;
    response: Response | null;
  }> {
    const start = Date.now();

    const response = await this.page.goto(ContactPage.url, {
      waitUntil: 'domcontentloaded',
    });

    const durationMs = Date.now() - start;

    return {
      durationMs,
      status: response?.status() ?? -1,
      ok: response?.ok() ?? false,
      response: response ?? null,
    };
  }

  /**
   * Assert that key contact details are present on the page.
   * Email is expected to appear exactly twice (e.g., header + body).
   */
  async assertContactDetailsVisible() {
    // Location label
    await expect(
      this.page.getByText('Location', { exact: false })
    ).toBeVisible({ timeout: 10_000 });

    // City / State
    await expect(
      this.page.getByText('Lake Ronkonkoma, NY', { exact: false })
    ).toBeVisible({ timeout: 10_000 });

    // Email address appears twice on the page
    const email = this.page.getByText('rgmichaels@gmail.com', { exact: false });

    await expect(
      email,
      'Expected email address to appear exactly twice'
    ).toHaveCount(2);

    // At least one instance must be visible
    await expect(email.first()).toBeVisible({ timeout: 10_000 });
  }
}
