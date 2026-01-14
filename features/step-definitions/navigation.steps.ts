import { Given, When, Then } from '@cucumber/cucumber';
import type { PWWorld } from '../../src/support/world';

Given('I am on the home page', async function (this: PWWorld) {
  await this.sitePage.gotoHome();
});

When('I click the {string} link on the home page', async function (this: PWWorld, linkText: string) {
  const link = this.page.getByRole('link', { name: linkText });

  // If link opens a new tab, capture it; otherwise continue in same tab
  const popupPromise = this.page.waitForEvent('popup', { timeout: 2000 }).catch(() => null);

  await link.click();

  const popup = await popupPromise;
  if (popup) {
    await popup.waitForLoadState('domcontentloaded');
    this.bindPages(popup); // <-- critical: rebind page objects to the new tab
  } else {
    await this.page.waitForLoadState('domcontentloaded');
  }
});

Then('I should be on {string}', async function (this: PWWorld, path: string) {
  // Keep generic: asserts URL contains the expected fragment
  await this.sitePage.assertUrlIncludes(path);
});

Then('the destination page should load', async function (this: PWWorld) {
  await this.sitePage.waitForReady();
});
