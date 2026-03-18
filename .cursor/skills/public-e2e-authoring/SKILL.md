---
name: public-e2e-authoring
description: Author stable Playwright tests for app.solstice.finance public user flows. Use when creating or updating tests in tests/public or tests/api, especially for selector strategy, waits, and non-destructive end-user assertions.
---

# Public E2E Authoring

Follow `AGENTS.md` as the source of truth. This skill optimizes day-to-day test authoring.

## Scope

- Public-accessible behavior only
- No private keys
- No destructive actions

## Authoring Rules

1. Use semantic selectors first (`getByRole`, `getByLabel`, accessible names).
2. Assert readiness before flow-specific assertions.
3. Prefer deterministic assertions over fragile visual assumptions.
4. Reuse `fixtures/` and `pages/` patterns where possible.
5. Keep each test independent and idempotent.

## Quick Workflow

1. Identify the user journey and expected behavior.
2. Implement or update a focused spec in `tests/public/` or `tests/api/`.
3. Keep assertions user-observable and stable.
4. Run targeted verification before broad suite runs.

## Done Checklist

- [ ] Uses semantic selectors
- [ ] Avoids fixed sleeps unless justified
- [ ] Works without private credentials
- [ ] Validation command and result recorded
