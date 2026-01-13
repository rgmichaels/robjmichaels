/**
 * Cucumber config
 * Run with tags:
 *   npm run test:e2e -- --tags "@smoke and not @wip"
 */
module.exports = {
  default: [
    "features/**/*.feature",
    "--require-module",
    "ts-node/register",
    "--require",
    "src/support/**/*.ts",
    "--require",
    "features/step-definitions/**/*.ts",

    // Remove deprecated publishQuiet flag:
    // "--publish-quiet",

    "--format",
    "progress-bar",
    "--format",
    "json:reports/cucumber-report.json",
    "--format",
    "html:reports/cucumber-report.html"
  ]
};
