import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 60_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  }
});
