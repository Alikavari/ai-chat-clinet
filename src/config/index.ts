//index.ts

import {getCurrentChainId, SupportedChainId} from '@/chains';
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi';
import {
  avalanche,
  avalancheFuji,
  mainnet,
  type AppKitNetwork
} from '@reown/appkit/networks';

export const projectId = '9ba1501155f1e72178bc1861538ba8bd';
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set');
}

let network: [AppKitNetwork, ...AppKitNetwork[]];
const chainId = getCurrentChainId();
if (chainId === SupportedChainId.AVALANCH) {
  network = [avalanche];
} else  {
  network = [avalancheFuji];
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = network; // base, sepolia, polygon,mainnet

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
});
