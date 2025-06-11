/**
 * List of all the networks supported by the ALICE Interface
 */
import * as envts from '../env.js';

export enum SupportedChainId {
  BSCTESTNET = 97,
  BSCMAINNET = 56,
  AVALANCHFUJI = 43113,
  AVALANCH = 43114
}
export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.BSCMAINNET]: 'bscmainnet',
  [SupportedChainId.BSCTESTNET]: 'bsctestnet',
  [SupportedChainId.AVALANCHFUJI]: 'avalancheFuji',
  [SupportedChainId.AVALANCH]: 'avalanche'
};

/**
 * All the chain IDs that are running the Ethereum protocol.
 */

export function isSupportedChain(
  chainId: number | null | undefined
): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId];
}

export function getCurrentChainId(): SupportedChainId {
  return Number(envts.VITE_PROJECT_CHAIN_ID) as SupportedChainId;
}
