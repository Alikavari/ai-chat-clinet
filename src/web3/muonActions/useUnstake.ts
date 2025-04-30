import {
  useWriteContract,
  useChainId,
  config,
  stakingAbi,
  MUON_NODE_STAKING_ADDRESS
} from './requriements';

export function useMuonUnstake() {
  const {writeContractAsync} = useWriteContract();
  const chainId = useChainId({config});
  async function tryUnstake(amount: bigint, call: (input: string) => void) {
    const someCondition = true; // Replace with your actual logic

    if (!someCondition) {
      console.warn('Condition failed. Not sending transaction.');
      return;
    }

    try {
      await writeContractAsync(
        {
          abi: stakingAbi,
          address: MUON_NODE_STAKING_ADDRESS[chainId.value],
          functionName: 'unstake',
          args: [amount]
          //chainId:
        },
        {
          onError: (error, variables, context) => {
            console.error('Error:', error.message);
            call(
              `The transaction was done unsuccessfully due to  this error ${error.message}`
            );
          },
          onSuccess: (data, variables, context) => {
            call(
              `The transaction was completed successfully with the transaction hash: ${data}`
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
