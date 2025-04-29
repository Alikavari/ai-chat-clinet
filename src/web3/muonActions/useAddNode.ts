import {useWriteContract} from '@wagmi/vue';
//import {MUON_NODE_STAKING_ADDRESS} from '../../addresses';
export function useMuonAddNode(abi: any) {
  const {writeContractAsync} = useWriteContract();

  async function tryAddNode(
    nodeAddress: string,
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
          address: '0xcb6f8f4eaa80148d16d08543b84770d71d7bcd7f', // MUON_NODE_STAKING_ADDRESS[43113],
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
              `The transaction was completed successfully with the transaction hash: ${data}`
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
