import { Given, Then } from "@cucumber/cucumber";
import type { PWWorld } from "../../src/support/world";
import { HomePage } from "../../src/pages/HomePage";

const expectedText =
  "Senior software quality professional with extensive experience owning quality outcomes across complex SaaS platforms. Proven leader in incident response, release readiness, and end-to-end testing across UI, API, and database layers. Experienced people leader with a track record of guiding teams through high-impact reliability and quality challenges.";

Given("I navigate to the home page", async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.goto();
});

Then("the home page should load successfully", async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.assertLoaded();
});

Then("I should see the professional summary text", async function (this: PWWorld) {
  const home = new HomePage(this.page);
  await home.assertHasText(expectedText);
});
