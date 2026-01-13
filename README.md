# TS + Cucumber + Playwright Framework (Page Objects, Tags, CI, Reporting)

## Quick start
```bash
npm i
npx playwright install --with-deps
npm run test:e2e
```

## Tags
Tag scenarios in `features/*.feature` and filter using the `TAGS` env var.

Examples:
```bash
# Run smoke only
TAGS='@smoke and not @wip' npm run test:e2e

# Run regression only
TAGS='@regression and not @wip' npm run test:e2e

# Run everything except wip
TAGS='not @wip' npm run test:e2e
```

Convenience scripts:
```bash
npm run test:smoke
npm run test:regression
```

## Reporting
After a run, open:
- `reports/cucumber-report.html`

GitHub Actions uploads `reports/` and `test-results/` as artifacts on every run.
