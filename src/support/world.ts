import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";
import { config } from "./config";

export class PWWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({ headless: config.headless });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.page?.close().catch(() => {});
    await this.context?.close().catch(() => {});
    await this.browser?.close().catch(() => {});
  }
}

setWorldConstructor(PWWorld);
