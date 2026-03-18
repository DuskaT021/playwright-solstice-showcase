import type { Page } from "@playwright/test";

const MOCK_ACCOUNT = "0x1111111111111111111111111111111111111111";
const MOCK_CHAIN_ID = "0x1";

type RpcParams = unknown[] | Record<string, unknown> | undefined;

function normalizeMethod(params: RpcParams): string | undefined {
  if (Array.isArray(params) && typeof params[0] === "object" && params[0] !== null) {
    const maybeMethod = (params[0] as Record<string, unknown>).method;
    return typeof maybeMethod === "string" ? maybeMethod : undefined;
  }
  return undefined;
}

export async function installMockWallet(page: Page): Promise<void> {
  await page.addInitScript(
    ({ account, chainId }) => {
      const walletProvider = {
        isMetaMask: true,
        selectedAddress: account,
        chainId,
        on: () => undefined,
        removeListener: () => undefined,
        request: async (args: { method: string; params?: unknown[] }) => {
          const method = args?.method;

          switch (method) {
            case "eth_requestAccounts":
            case "eth_accounts":
              return [account];
            case "eth_chainId":
              return chainId;
            case "wallet_switchEthereumChain":
              return null;
            default:
              return null;
          }
        },
        send: async (payload: { method?: string } | unknown[]) => {
          let method: string | undefined;
          if (Array.isArray(payload)) {
            method = payload.length ? normalizeMethod(payload) : undefined;
          } else {
            method = payload.method;
          }

          if (method === "eth_chainId") {
            return { result: chainId };
          }

          return { result: [account] };
        },
      };

      Object.defineProperty(window, "ethereum", {
        configurable: true,
        value: walletProvider,
      });
    },
    { account: MOCK_ACCOUNT, chainId: MOCK_CHAIN_ID },
  );
}
