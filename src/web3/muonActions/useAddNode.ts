import {
  useWriteContract,
  useChainId,
  config,
  stakingAbi as abi,
  MUON_NODE_STAKING_ADDRESS
} from './requriements';
import {checkIPwithNodeSpecificationsAPI} from '../../apis';

export function useMuonAddNode() {
  const {writeContractAsync} = useWriteContract();
  const chainID = useChainId({config});
  async function tryAddNode(
    nodeAddress: `0x${string}`,
    nodeIP: string,
    amount: bigint,
    peerID: string,
    call: (input: string) => void
  ) {
    const someCondition = true; // Replace with your actual logic

    if (!someCondition) {
      console.warn('Condition failed. Not sending transaction.');
      return;
    }

    try {
      // const response = await checkIPwithNodeSpecificationsAPI({
      //   nodeIP: nodeIP,
      //   peerID: peerID,
      //   nodeAddress: nodeAddress
      // });
      // if (!response.success) {
      //   call('The transaction was done unsuccessfully, something went wrong');
      //   return;
      // }
      await writeContractAsync(
        {
          abi,
          address: MUON_NODE_STAKING_ADDRESS[chainID.value], // MUON_NODE_STAKING_ADDRESS[43113],
          functionName: 'addMuonNodeByToken',
          args: [nodeAddress, peerID, amount]
          //chainId:
        },
        {
          onError: (error, variables, context) => {
            console.error('Error:', error.message);
            call(`The transaction was done unsuccessfully.`);
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
