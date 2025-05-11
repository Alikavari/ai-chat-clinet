import {
  useWriteContract,
  useChainId,
  config,
  stakingAbi as abi,
  MUON_NODE_STAKING_ADDRESS
} from './requriements';

export function useMuonAddNode() {
  const {writeContractAsync} = useWriteContract();
  const chainID = useChainId({config});
  async function tryAddNode(
    nodeAddress: `0x${string}`,
    nodeIp: string,
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
          address: MUON_NODE_STAKING_ADDRESS[chainID.value], // MUON_NODE_STAKING_ADDRESS[43113],
          functionName: 'addMuonNodeByToken',
          args: [nodeAddress, nodeIp, amount]
          //chainId:
        },
        {
          onError: (error, variables, context) => {
            console.error('Error:', error.message);
            call(
              `The transaction was done unsuccessfully due to this error ${error.message}`
            );
          },
          onSuccess: (data, variables, context) => {
            call(
              `The transaction was completed successfully with the transaction hash: ${data} `
            );
          }
        }
      );
    } catch (err) {
      //call('Transaction failed:' + err);
      //throw err;
    }
  }

  return {
    tryAddNode
  };
}
