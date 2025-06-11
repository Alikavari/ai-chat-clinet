import MuonNodeStaking from '@/abis/ALICE/BSCTestnet/MuonNodeStaking';
import {
  useWriteContract,
  useChainId,
  config,
  stakingAbi,
  MUON_NODE_STAKING_ADDRESS,
  getclimableTime,
  getCurrentChainId
} from './requriements';

export function useMuonUnstake() {
  const {writeContractAsync} = useWriteContract();
  const chainID = useChainId({config});
  async function tryUnstake(
    userWalletAddress: `0x${string}`,
    amount: bigint,
    call: (input: string) => void
  ) {
    const someCondition = true; // Replace with your actual logic

    if (!someCondition) {
      console.warn('Condition failed. Not sending transaction.');
      return;
    }

    try {
      await writeContractAsync(
        {
          abi: stakingAbi,
          address: MUON_NODE_STAKING_ADDRESS[chainID.value],
          functionName: 'unstake',
          args: [amount],
          chainId: getCurrentChainId()
        },
        {
          onError: (error, variables, context) => {
            console.error('Error:', error.message);
            call(`The transaction was done unsuccessfully.`);
          },
          onSuccess: async (data, variables, context) => {
            const formattedDate = await getclimableTime(chainID.value, userWalletAddress);
            console.log(formattedDate);
            call(
              `Transaction succeeded with hash ${data}. Claim available in two weeks.`
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
    tryUnstake
  };
}
