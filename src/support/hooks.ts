import { Before, After, Status } from "@cucumber/cucumber";
import type { PWWorld } from "./world";
import fs from "node:fs";
import path from "node:path";

Before(async function (this: PWWorld) {
  await this.init();
});

After(async function (this: PWWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const png = await this.page.screenshot({ fullPage: true });
    await this.attach(png, "image/png");

    const dir = path.resolve("test-results");
    fs.mkdirSync(dir, { recursive: true });
    const safeName = scenario.pickle.name.replace(/[^a-z0-9-_ ]/gi, "_");
    fs.writeFileSync(path.join(dir, `${safeName}.png`), png);
  }

  await this.cleanup();
});
