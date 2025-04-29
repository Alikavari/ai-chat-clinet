// src/composables/useMyTransaction.ts
import {useWriteContract} from '@wagmi/vue';

export function useMuonApprove(abi: any) {
  const {writeContractAsync} = useWriteContract();

  async function tryApprove(
    spenderAddress: string,
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
          abi,
          address: '0x383FA34836A5F5D3805e77df4f60A62D75034579',
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
