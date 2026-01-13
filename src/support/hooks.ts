import { Before, After, Status } from "@cucumber/cucumber";
import type { PWWorld } from "./world";

Before(async function (this: PWWorld) {
  await this.init();
});

After(async function (this: PWWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const png = await this.page.screenshot({ fullPage: true });
    await this.attach(png, "image/png");
  }

  await this.cleanup();
});
