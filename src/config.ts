import {http, createConfig} from '@wagmi/vue';
import {avalanche, avalancheFuji} from '@wagmi/vue/chains';

export const config = createConfig({
  chains: [avalanche],
  transports: {
    [avalanche.id]: http()
  }
});
