import {http, createConfig} from '@wagmi/vue';
import {avalancheFuji} from '@wagmi/vue/chains';

export const config = createConfig({
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http()
  }
});
