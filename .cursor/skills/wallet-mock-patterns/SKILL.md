---
name: wallet-mock-patterns
description: Implement and maintain deterministic Playwright Solana wallet simulation (Phantom-shaped window.solana / window.phantom.solana) for tests/wallet-mock. Use when editing wallet mocks or validating simulation guardrails.
---

# Wallet Mock Patterns

Follow `AGENTS.md` as source of truth. This skill focuses on simulation consistency for **Solana** browser wallets.

## Scope

- Simulation-only wallet coverage
- Isolated wallet tests in `tests/wallet-mock/`
- Non-blocking CI role for wallet-mock suite

## Discovery / assumptions

- Solstice targets **Solana**. The mock matches the common resolution order **`window.phantom?.solana ?? window.solana`** used by many apps (e.g. `@solana/wallet-adapter` Phantom adapter).
- If the production app changes wallet detection (Wallet Standard only, another global, etc.), update `mockSolanaWallet.ts` and assertions accordingly.

## Rules

1. Inject provider **before** navigation (`page.addInitScript`).
2. Keep **deterministic** mock public key (`MOCK_SOLANA_PUBLIC_KEY_BASE58` in `mockSolanaWallet.ts`).
3. Implement connect/disconnect, `publicKey`, and noop/stub `signTransaction` / `signAllTransactions` as needed for stubs.
4. Never present mock results as production wallet integration proof.
5. Keep assertions on **injection + stub contract** (+ optional stable UI), not extension internals.

## Validation

- Wallet-mock validation: `npm run test:wallet-mock` + `npm run lint` + `npm run typecheck`.
- Tests assert injection + stub contract (+ optional stable UI), **not** real wallet security.

## Workflow

1. Update `mockSolanaWallet.ts` if the app’s expected provider surface changes.
2. Add or adjust `@wallet-mock` tagged specs under `tests/wallet-mock/`.
3. Validate isolation and `npm run test:wallet-mock`.

## Done Checklist

- [ ] Provider installed before app load
- [ ] Deterministic pubkey used
- [ ] Tests remain in wallet-mock scope
- [ ] Output clearly states simulation limitations
