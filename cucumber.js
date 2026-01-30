module.exports = {
  default: [
    "features/**/*.feature",

    "--require-module",
    "ts-node/register",

    "--require",
    "src/support/**/*.ts",

    // NEW location for migrated step definitions
    "--require",
    "src/steps/**/*.ts",

    // OLD location (keep while migrating one-by-one)
    "--require",
    "features/step-definitions/**/*.ts",

    "--format",
    "progress-bar",
    "--format",
    "json:reports/cucumber-report.json",
    "--format",
    "html:reports/cucumber-report.html"
  ]
};
