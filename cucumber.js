module.exports = {
  default: [
    "features/**/*.feature",

    "--require-module",
    "ts-node/register",

    "--require",
    "src/support/**/*.ts",

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
