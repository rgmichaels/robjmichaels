import type { Page } from "playwright";

export class SitePage {
  constructor(private page: Page) {}

  async assertUrlEndsWith(path: string) {
    const url = this.page.url();
    if (!url.includes(path)) {
      throw new Error(`Expected URL to include "${path}" but got: ${url}`);
    }
  }

  async assertLoaded() {
    const title = await this.page.title();
    if (!title || title.trim().length === 0) {
      throw new Error("Expected page title to be non-empty, but it was empty.");
    }
  }

  async assertBodyContains(text: string) {
    const bodyText = await this.page.locator("body").innerText();
    if (!bodyText.includes(text)) {
      throw new Error(`Expected page body to contain:\n${text}`);
    }
  }
}
