import { Given, When, Then } from '@cucumber/cucumber';
import { SitePage } from '../../src/pages/SitePage';

Given('I am on the home page', async function () {
  await this.page.goto('https://robjmichaels.com/', {
    waitUntil: 'domcontentloaded',
  });

  this.sitePage = new SitePage(this.page);
});

When('I click the {string} link on the home page', async function (linkText: string) {
  const link = this.page.getByRole('link', { name: linkText });

  // Try to detect a new tab (PDF / external link)
  const popupPromise = this.page
    .waitForEvent('popup', { timeout: 2000 })
    .catch(() => null);

  await link.click();

  const popup = await popupPromise;

  if (popup) {
    // Resume opened in a new tab
    this.page = popup;
    this.sitePage = new SitePage(this.page);
  }

  await this.sitePage.waitForPageReady();
});

Then('I should be on {string}', async function (path: string) {
  await this.sitePage.assertUrlIncludes(path);
});

Then('the destination page should load', async function () {
  await this.sitePage.waitForPageReady();
});
