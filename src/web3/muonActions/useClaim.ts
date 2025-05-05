import MuonNodeStaking from '@/abis/ALICE/BSCTestnet/MuonNodeStaking';
import {
  useWriteContract,
  useChainId,
  config,
  stakingAbi,
  MUON_NODE_STAKING_ADDRESS,
  readContract
} from './requriements';

export function useMuonCaliming() {
  const {writeContractAsync} = useWriteContract();
  const chainID = useChainId({config});
  async function tryClaim(
    userWalletAddress: `0x${string}`,
    call: (input: string) => void
  ) {
    const pendingUnstakes = await readContract(config, {
      abi: stakingAbi,
      address: MUON_NODE_STAKING_ADDRESS[chainID.value],
      functionName: 'pendingUnstakes',
      args: [userWalletAddress]
    });
    console.log(pendingUnstakes);
    if (pendingUnstakes <= 0) {
      call('The transaction was done unsuccessfully. no pending unstake to claim');
      return;
    }

    try {
      await writeContractAsync(
        {
          abi: stakingAbi,
          address: MUON_NODE_STAKING_ADDRESS[chainID.value],
          functionName: 'claimUnstake',
          args: []
          //chainId:
        },
        {
          onError: (error, variables, context) => {
            console.error('Error:', error.message);
            call(
              `The transaction was done unsuccessfully due to  this error ${error.message}`
            );
          },
          onSuccess: async (data, variables, context) => {
            const exitPeriod = await readContract(config, {
              abi: stakingAbi,
              address: MUON_NODE_STAKING_ADDRESS[chainID.value],
              functionName: 'exitPendingPeriod',
              args: []
            });
            const userUnstakeReqTime = await readContract(config, {
              abi: stakingAbi,
              address: MUON_NODE_STAKING_ADDRESS[chainID.value],
              functionName: 'unstakeReqTimes',
              args: [userWalletAddress]
            });
            const claimableTime = userUnstakeReqTime + exitPeriod;
            const claimDate = new Date(Number(claimableTime) * 1000).toLocaleString();
            console.log(userUnstakeReqTime);
            console.log(claimDate);
            call(
              `The transaction was completed successfully with the transaction hash: ${data}\n the user can claim its coins in ${claimDate}`
            );
          }
        }
      );
    } catch (err) {
      //   call('Transaction failed:' + err);
      //   throw err;
    }
  }

  return {
    tryClaim
  };
}
