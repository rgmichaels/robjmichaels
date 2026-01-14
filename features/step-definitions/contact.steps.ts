import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { PWWorld } from '../../src/support/world';

type NavResult = {
  durationMs: number;
  status: number;
  ok: boolean;
  response: import('@playwright/test').Response | null;
};

function requireLastNavigation(world: PWWorld): NavResult {
  if (!world.lastNavigation) {
    throw new Error(
      'lastNavigation was undefined. Did the scenario run "Given I navigate to the contact page" first?'
    );
  }
  return world.lastNavigation;
}

Given('I navigate to the contact page', async function (this: PWWorld) {
  this.lastNavigation = await this.contactPage.gotoAndMeasure();
});

Then('the contact page should respond successfully', async function (this: PWWorld) {
  const nav = requireLastNavigation(this);

  // For normal navigations this should exist; keep a clear error if it doesn't.
  expect(nav.response, 'Expected a navigation response object').toBeTruthy();

  // status/ok are already precomputed, but we also sanity-check the range
  expect(nav.ok, `Expected response OK but got status ${nav.status}`).toBeTruthy();
  expect(nav.status, `Expected status >= 200 but got ${nav.status}`).toBeGreaterThanOrEqual(200);
  expect(nav.status, `Expected status < 400 but got ${nav.status}`).toBeLessThan(400);
});

Then('the contact page should load in under 2 seconds', async function (this: PWWorld) {
  const nav = requireLastNavigation(this);

  expect(
    nav.durationMs,
    `Expected load < 2000ms but got ${nav.durationMs}ms`
  ).toBeLessThan(2000);
});

Then('I should see my contact details on the contact page', async function (this: PWWorld) {
  await this.contactPage.assertContactDetailsVisible();
});
