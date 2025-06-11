import MuonNodeStaking from '@/abis/ALICE/BSCTestnet/MuonNodeStaking';
import {
  useWriteContract,
  useChainId,
  config,
  stakingAbi,
  MUON_NODE_STAKING_ADDRESS,
  readContractOnCurrentChainId,
  getCurrentChainId
} from './requriements';

export function useMuonCaliming() {
  const {writeContractAsync} = useWriteContract();
  const chainID = useChainId({config});
  async function tryClaim(
    userWalletAddress: `0x${string}`,
    call: (input: string) => void
  ) {
    const pendingUnstakes = await readContractOnCurrentChainId(config as any, {
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
          args: [],
          chainId: getCurrentChainId()
        },
        {
          onError: (error, variables, context) => {
            console.error('Error:', error.message);
            call(`The transaction was done unsuccessfully.`);
          },
          onSuccess: async (data, variables, context) => {
            call(
              `The transaction was completed successfully with the transaction hash: ${data}\n`
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
