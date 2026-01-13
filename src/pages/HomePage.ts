import type { Page } from "playwright";
import { config } from "../support/config";

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(config.baseUrl, { waitUntil: "domcontentloaded" });
  }

  async assertLoaded() {
    const title = await this.page.title();
    if (!title || title.trim().length === 0) {
      throw new Error("Expected page title to be non-empty, but it was empty.");
    }
  }

  async assertHasText(expected: string) {
    // Resilient text assertion (not tied to a brittle selector)
    const bodyText = await this.page.locator("body").innerText();
    if (!bodyText.includes(expected)) {
      throw new Error(
        `Expected page to contain the required text, but it was not found.\n\nMissing:\n${expected}`
      );
    }
  }
}
