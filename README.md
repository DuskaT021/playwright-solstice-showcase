# Playwright Solstice Showcase

Practical SDET portfolio project focused on end-user testing for [app.solstice.finance](https://app.solstice.finance/) using public browser-accessible behavior only (no private API keys required).

## Why this repo exists

This repository demonstrates how I approach real-world UI automation against a third-party production app:

- build stable tests around user-observable behavior;
- separate reliable CI signal from advanced experimental coverage;
- keep debugging fast with traces, videos, and clear test structure.

## What is covered

- Public end-user smoke and navigation checks in `tests/public/`
- Public endpoint reachability check in `tests/api/`
- Optional mocked wallet-provider scenarios in `tests/wallet-mock/` (explicit simulation)

## Tech stack

- Playwright Test + TypeScript
- npm
- ESLint + Prettier
- GitHub Actions CI

## Project layout

```text
.
├── fixtures/
│   └── test.ts
├── pages/
│   └── solsticeHomePage.ts
├── tests/
│   ├── api/
│   ├── public/
│   ├── wallet-mock/
│   └── types/
├── utils/
├── playwright.config.ts
└── .github/workflows/playwright.yml
```

## Reliability strategy

- Prefer role-based selectors (`getByRole`) over brittle CSS selectors.
- Keep wallet-mock tests isolated from core public flow quality signal.
- Use Playwright artifacts (`trace`, `video`, `screenshot`) on failures.
- Avoid destructive actions and private/credentialed paths.

## Local setup

```bash
npm install
npx playwright install
```

## Run commands

```bash
# Full suite
npm test

# Public coverage only
npm run test:public

# Optional wallet simulation coverage
npm run test:wallet-mock

# Interactive UI runner
npm run test:ui

# Lint and type safety
npm run lint
npm run typecheck
```

## CI behavior

GitHub Actions workflow:

- runs lint + typecheck;
- runs blocking public suite (`public-*` + `api-smoke`);
- runs mocked-wallet suite as non-blocking showcase coverage;
- uploads test artifacts for investigation.

## Real-world tradeoffs

Testing a third-party hosted app means app changes can affect automation stability. To handle that:

- public tests focus on stable surface area and accessibility-friendly selectors;
- mocked wallet tests are clearly marked as simulation, not production wallet integration proof;
- CI prioritizes high-signal user flows over exhaustive brittle checks.

## Debugging workflow

When a test fails:

1. Open HTML report: `npm run test:report`
2. Inspect trace/video in `test-results/`
3. Re-run targeted spec in headed mode:
   - `npx playwright test tests/public/landing.spec.ts --headed`

## Notes

- This project intentionally avoids private API credentials.
- All tests are non-destructive and user-journey focused.
