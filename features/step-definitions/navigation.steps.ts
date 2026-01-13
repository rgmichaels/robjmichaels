import { Given, When, Then } from "@cucumber/cucumber";
import type { PWWorld } from "../../src/support/world";
import { HomePage } from "../../src/pages/HomePage";
import { SitePage } from "../../src/pages/SitePage";

Given("I am on the home page", async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.goto();
  await home.assertLoaded();
});

When('I click the "{word}" link on the home page', async function (this: PWWorld, linkName: string) {
  const home = new HomePage(this.page);

  if (!["Resume", "Portfolio", "Contact"].includes(linkName)) {
    throw new Error(`Unsupported nav link "${linkName}"`);
  }

  await home.clickNavLink(linkName as "Resume" | "Portfolio" | "Contact");
});

Then('I should be on {string}', async function (this: PWWorld, path: string) {
  const site = new SitePage(this.page);
  await site.assertUrlEndsWith(path);
});

Then("the destination page should load", async function (this: PWWorld) {
  const site = new SitePage(this.page);
  await site.assertLoaded();
});
