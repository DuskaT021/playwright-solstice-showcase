import type { Page } from "@playwright/test";

/**
 * Deterministic mock Solana wallet (Phantom-shaped) for browser injection.
 *
 * Discovery note: Solstice is Solana-focused. Many Solana apps resolve the in-browser
 * wallet via `window.phantom?.solana ?? window.solana` (e.g. wallet-adapter pattern).
 * This mock implements that surface so automated tests can assert injection + stub
 * contract without a real extension.
 */
export const MOCK_SOLANA_PUBLIC_KEY_BASE58 =
  "So11111111111111111111111111111111111111112";

export async function installMockSolanaWallet(page: Page): Promise<void> {
  await page.addInitScript(
    ({ publicKeyBase58 }) => {
      const listeners = new Map<string, Set<(...args: unknown[]) => void>>();

      const emit = (event: string, ...args: unknown[]): void => {
        listeners.get(event)?.forEach((fn) => {
          fn(...args);
        });
      };

      const mockPublicKey = {
        toBase58: () => publicKeyBase58,
        toString: () => publicKeyBase58,
        toJSON: () => publicKeyBase58,
        equals: () => false,
      };

      let publicKey: typeof mockPublicKey | null = null;

      const wallet = {
        isPhantom: true,
        get publicKey() {
          return publicKey;
        },
        connect: async () => {
          publicKey = mockPublicKey;
          emit("connect", publicKey);
          return { publicKey: mockPublicKey };
        },
        disconnect: async () => {
          publicKey = null;
          emit("disconnect");
        },
        on: (event: string, handler: (...args: unknown[]) => void) => {
          if (!listeners.has(event)) {
            listeners.set(event, new Set());
          }
          listeners.get(event)!.add(handler);
        },
        removeListener: (event: string, handler: (...args: unknown[]) => void) => {
          listeners.get(event)?.delete(handler);
        },
        signTransaction: async (tx: unknown) => tx,
        signAllTransactions: async (txs: unknown[]) => txs,
      };

      Object.defineProperty(window, "solana", {
        configurable: true,
        value: wallet,
      });

      Object.defineProperty(window, "phantom", {
        configurable: true,
        value: { solana: wallet },
      });
    },
    { publicKeyBase58: MOCK_SOLANA_PUBLIC_KEY_BASE58 },
  );
}
