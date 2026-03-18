---
name: ci-shard-triage
description: Triage Playwright failures in sharded CI runs. Use when a GitHub Actions shard fails and you need fast local reproduction, artifact-driven debugging, and root cause classification.
---

# CI Shard Triage

Follow `AGENTS.md` first. This skill standardizes shard incident response.

## Inputs

- Failing shard id (for example `2/3`)
- Failing spec or test title
- CI artifacts (`blob-report`, `test-results`)

## Workflow

1. Reproduce the shard locally:
   - `npm run test:public:shard -- --shard=2/3`
2. Re-run failing spec in headed mode if UI behavior is unclear.
3. Inspect trace and artifacts from `test-results/` and `blob-report/`.
4. Classify failure:
   - selector drift
   - timing/race
   - infra/network
5. Propose minimal, test-stability-focused fix.

## Output Template

- Root cause:
- Evidence:
- Fix:
- Validation command:
- Residual risk:
