import aliceAbi from '../../abis/ALICE/BSCTestnet/ALICE';
import stakingAbi from '../../abis/ALICE/BSCTestnet/MuonNodeStaking';

export {config} from '../../config';
export {ALICE_ADDRESS, MUON_NODE_STAKING_ADDRESS} from '../../addresses';
export {useWriteContract, useChainId} from '@wagmi/vue';
export {aliceAbi, stakingAbi};
