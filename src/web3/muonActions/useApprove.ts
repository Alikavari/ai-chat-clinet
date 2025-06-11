import {
  useWriteContract,
  useChainId,
  config,
  aliceAbi,
  ALICE_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
  getCurrentChainId
} from './requriements';

export function useMuonApprove() {
  const {writeContractAsync} = useWriteContract();
  const chainID = useChainId({config});
  async function tryApprove(amount: bigint, call: (input: string) => void) {
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
          args: [MUON_NODE_STAKING_ADDRESS[chainID.value], amount],
          chainId: getCurrentChainId()
        },
        {
          onError: (error, variables, context) => {
            console.error('Error:', error.message);
            call(`The transaction was done unsuccessfully.`);
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
