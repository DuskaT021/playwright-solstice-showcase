export {};

/** Minimal Phantom-shaped provider for wallet-mock injection (see tests/wallet-mock/mockSolanaWallet.ts). */
interface MockSolanaPublicKey {
  toBase58: () => string;
  toString: () => string;
}

interface MockSolanaWalletProvider {
  isPhantom?: boolean;
  publicKey: MockSolanaPublicKey | null;
  connect: () => Promise<{ publicKey: MockSolanaPublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
  signTransaction: (tx: unknown) => Promise<unknown>;
  signAllTransactions: (txs: unknown[]) => Promise<unknown[]>;
}

declare global {
  interface Window {
    solana?: MockSolanaWalletProvider;
    phantom?: {
      solana?: MockSolanaWalletProvider;
    };
  }
}
