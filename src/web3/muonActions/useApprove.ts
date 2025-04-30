import {
  useWriteContract,
  useChainId,
  config,
  aliceAbi,
  ALICE_ADDRESS
} from './requriements';

export function useMuonApprove() {
  const {writeContractAsync} = useWriteContract();
  const chainID = useChainId({config});
  async function tryApprove(
    spenderAddress: `0x${string}`,
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
          abi: aliceAbi,
          address: ALICE_ADDRESS[chainID.value],
          functionName: 'approve',
          args: [spenderAddress, amount]
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
      // call('Transaction failed:' + err);
      // throw err;
    }
  }

  return {
    tryApprove
  };
}
