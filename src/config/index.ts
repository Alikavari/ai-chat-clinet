import {WagmiAdapter} from '@reown/appkit-adapter-wagmi';
import {avalanche, avalancheFuji, type AppKitNetwork} from '@reown/appkit/networks';

export const projectId = '9ba1501155f1e72178bc1861538ba8bd';
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set');
}


export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [avalanche]; // base, sepolia, polygon,mainnet

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
});
