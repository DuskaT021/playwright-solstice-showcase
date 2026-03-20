# Agent Playbook

This file is the source of truth for AI agents and contributors working in this repository.

## Repository Scope

- Target app: `https://app.solstice.finance`
- Testing style: end-user focused Playwright automation
- Access model: public URL behavior only, no private API keys
- Safety model: non-destructive actions only

## Core Standards

## Test Generation

You are a Playwright test generator and an expert in TypeScript, Frontend development, and Playwright end-to-end testing.

You are given a scenario and you need to generate a Playwright test for it.

1. Use the tools provided by the Playwright MCP server to navigate the site and generate tests based on the current state and site snapshots. Do not generate tests based on assumptions.
2. Access the page snapshot **before** interacting with the page.
3. Only after all steps are completed, emit a Playwright TypeScript test that uses `@playwright/test` based on message history.
4. When generating test code, place it in the `tests/` directory and **always** follow Playwright best practices.
5. When the test is generated, always verify the generated code by running `npx playwright test` and fix any issues before finalizing.

### Public E2E Authoring

1. Prefer semantic selectors (`getByRole`, `getByLabel`, accessible names).
2. Avoid brittle CSS/XPath selectors unless no semantic selector exists.
3. Assert page readiness before deeper flow assertions.
4. Keep tests isolated and deterministic.
5. Use fixtures and POM patterns already present in `fixtures/` and `pages/`.

### Wallet Mock Guardrails

1. Wallet tests are simulation-only, never production wallet proof.
2. Inject a **Solana** browser-wallet stub before navigation (`addInitScript`), e.g. Phantom-shaped `window.solana` / `window.phantom.solana` (see `tests/wallet-mock/mockSolanaWallet.ts`).
3. Keep a deterministic mock **public key** (not Ethereum chain/account semantics).
4. Keep wallet tests isolated in `tests/wallet-mock/`.
5. Preserve non-blocking CI behavior for wallet-mock coverage.
6. **Validation:** `npm run test:wallet-mock` plus `npm run lint` and `npm run typecheck`; tests prove injection + stub contract (+ optional stable UI), not real wallet security.

### CI Shard Triage

When a shard fails:

1. Identify failing shard and test from CI logs.
2. Reproduce shard locally:
   - `npm run test:public:shard -- --shard=2/3`
3. Re-run failing spec in headed mode:
   - `npx playwright test tests/public/<spec>.spec.ts --headed`
4. Inspect artifacts in `test-results/` and shard `blob-report/`.
5. Classify cause: selector drift, timing/race, or infrastructure/network.

## Required Validation Before Commit

Run:

- `npm run lint`
- `npm run typecheck`
- targeted test command related to your change (for example `npm run test:public:shard -- --shard=1/3 --list` or a focused `npx playwright test ...`)

## Reporting Expectations

Agent outputs should include:

- root cause summary (if fixing a failure),
- exact command used to validate,
- any residual risks or follow-up checks.
