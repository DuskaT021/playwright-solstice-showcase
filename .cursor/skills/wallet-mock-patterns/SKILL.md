---
name: wallet-mock-patterns
description: Implement and maintain deterministic Playwright wallet mock scenarios using EIP-1193 provider injection. Use when editing tests/wallet-mock or validating wallet simulation guardrails.
---

# Wallet Mock Patterns

Follow `AGENTS.md` as source of truth. This skill focuses on simulation consistency.

## Scope

- Simulation-only wallet coverage
- Isolated wallet tests in `tests/wallet-mock/`
- Non-blocking CI role for wallet-mock suite

## Rules

1. Inject provider before navigation (`addInitScript`).
2. Keep deterministic mock account and chain values.
3. Implement key provider methods (`eth_requestAccounts`, `eth_accounts`, `eth_chainId`).
4. Never present mock results as production wallet integration proof.
5. Keep assertions on behavior compatibility, not extension-specific internals.

## Workflow

1. Update mock helper for provider behavior.
2. Add or adjust tagged wallet-mock spec.
3. Validate isolation and suite command behavior.
4. Document simulation assumptions when relevant.

## Done Checklist

- [ ] Provider installed before app load
- [ ] Deterministic values used
- [ ] Tests remain in wallet-mock scope
- [ ] Output clearly states simulation limitations
