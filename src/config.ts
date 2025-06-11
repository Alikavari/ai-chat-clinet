//config.ts

import {http, createConfig} from '@wagmi/vue';
import {avalanche, avalancheFuji, mainnet} from '@wagmi/vue/chains';
import {getCurrentChainId, SupportedChainId} from './chains';

const chainId = getCurrentChainId();

let wagmiConfig;

if (chainId === SupportedChainId.AVALANCH) {
  wagmiConfig = createConfig({
    chains: [avalanche],
    transports: {
      [avalanche.id]: http()
    }
  });
} else  {
  wagmiConfig = createConfig({
    chains: [avalancheFuji],
    transports: {
      [avalancheFuji.id]: http()
    }
  });
} 

console.log('the cofig file :\n ', wagmiConfig.chains);
export const config = wagmiConfig;
