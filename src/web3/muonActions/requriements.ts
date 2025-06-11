import aliceAbi from '../../abis/ALICE/BSCTestnet/ALICE';
import stakingAbi from '../../abis/ALICE/BSCTestnet/MuonNodeStaking';
import managerAbi from '../../abis/ALICE/BSCTestnet/MuonNodeManager';

export {config} from '../../config';
export {
  ALICE_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
  MUON_NODE_MANAGER_ADDRESS
} from '../../addresses';
export {useWriteContract, useChainId} from '@wagmi/vue';
export {readContractOnCurrentChainId} from './readContractOnCurrentChianId';

export {aliceAbi, stakingAbi, managerAbi};
export {getclimableTime} from './readContractByname';
export {getCurrentChainId} from '@/chains';
