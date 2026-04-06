# Playwright Solstice Showcase

![Playwright CI](https://github.com/DuskaT021/playwright-e2e-suite/actions/workflows/playwright.yml/badge.svg)

Practical SDET portfolio project focused on end-user testing for [app.solstice.finance](https://app.solstice.finance/) using public browser-accessible behavior only (no private API keys required).

---

## 🐛 Bugs caught in production

Running this suite against [app.solstice.finance](https://app.solstice.finance) surfaced 3 real issues in the live app:

| # | Test | Finding |
|---|------|---------|
| 1 | `landing.spec.ts` | "Swap" link renders with duplicate accessible names — strict mode violation |
| 2 | `navigation.spec.ts` | "Connect Your Wallet" button label differs from live DOM |
| 3 | `responsive.spec.ts` | "Toggle Sidebar" button has no accessible name in live app |

All three point to missing or incorrect ARIA labelling on the production app.
Locators were hardened using `.or()` fallbacks and `exact: true` matching
as a temporary mitigation — the root fix belongs in the app.

---

## Why this repo exists

This repository demonstrates how I approach real-world UI automation against a third-party production app:

* build stable tests around user-observable behavior;
* separate reliable CI signal from advanced experimental coverage;
* keep debugging fast with traces, videos, and clear test structure.

---

## What is covered

* Public end-user smoke and navigation checks in `tests/public/`
* Public endpoint reachability check in `tests/api/`
* Optional **Solana** wallet simulation in `tests/wallet-mock/` (Phantom-shaped `window.solana` / `window.phantom.solana`; not production wallet proof)

---

## Tech stack

* Playwright Test + TypeScript
* npm
* ESLint + Prettier
* GitHub Actions CI

---

## Agent guidance

* Cross-agent source of truth: `AGENTS.md`
* Cursor-specific skills (optional convenience layer):
  + `.cursor/skills/public-e2e-authoring/SKILL.md`
  + `.cursor/skills/ci-shard-triage/SKILL.md`
  + `.cursor/skills/wallet-mock-patterns/SKILL.md`

---

## Project layout

```
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

---

## Reliability strategy

* Prefer role-based selectors (`getByRole`) over brittle CSS selectors.
* Keep wallet-mock tests isolated from core public flow quality signal.
* Use Playwright artifacts (`trace`, `video`, `screenshot`) on failures.
* Avoid destructive actions and private/credentialed paths.

---

## Local setup

```bash
npm install
npx playwright install
```

---

## Run commands

```bash
# Full suite
npm test

# Full suite with more local concurrency
npm run test:fast

# Public coverage only
npm run test:public

# Faster local public loop (Chromium + API)
npm run test:public:fast

# Optional Solana wallet simulation coverage
npm run test:wallet-mock

# Interactive UI runner
npm run test:ui

# Lint and type safety
npm run lint
npm run typecheck
```

---

## CI behavior

GitHub Actions workflow:

* runs lint + typecheck;
* runs Chromium public tests in parallel shard jobs (`1/3`, `2/3`, `3/3`);
* runs `api-smoke` as a separate blocking job;
* runs mocked-wallet suite as non-blocking showcase coverage;
* uploads shard-specific test artifacts for investigation and report merging.

To rerun a failing shard locally:

```bash
npm run test:public:shard -- --shard=2/3
```

---

## Debugging workflow

When a test fails:

1. Open HTML report: `npm run test:report`
2. Inspect trace/video in `test-results/`
3. Re-run targeted spec in headed mode:

```bash
npx playwright test tests/public/landing.spec.ts --headed
```

---

## Real-world tradeoffs

Testing a third-party hosted app means app changes can affect automation stability. To handle that:

* public tests focus on stable surface area and accessibility-friendly selectors;
* mocked wallet tests are clearly marked as simulation, not production wallet integration proof;
* CI prioritizes high-signal user flows over exhaustive brittle checks.

---

## Notes

* This project intentionally avoids private API credentials.
* All tests are non-destructive and user-journey focused.
