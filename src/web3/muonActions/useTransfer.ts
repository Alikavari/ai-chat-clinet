import {
  useWriteContract,
  useChainId,
  config,
  aliceAbi as abi,
  ALICE_ADDRESS
} from './requriements';

export function useMuonTransfer() {
  const {writeContractAsync} = useWriteContract();
  const chainID = useChainId({config});
  console.log(chainID.value);
  async function tryTransfer(
    walletAddress: `0x${string}`,
    value: bigint,
    call: (input: string) => void
  ) {
    const someCondition = true; // Replace with your actual logic

    if (!someCondition) {
      console.warn('Condition failed. Not sending transaction.');
      return;
    }

    try {
      console.log('ALICE_ADDRESS', ALICE_ADDRESS);
      await writeContractAsync(
        {
          abi,
          address: ALICE_ADDRESS[chainID.value],
          functionName: 'transfer',
          args: [walletAddress, value]
          //chainId:
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
      //throw err;
    }
  }

  return {
    tryTransfer
  };
}
