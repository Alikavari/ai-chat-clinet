import {
  useWriteContract,
  useChainId,
  config,
  stakingAbi,
  MUON_NODE_STAKING_ADDRESS,
  readContract
} from './requriements';

import {useBlockNumber} from '@wagmi/vue';
import fetchRewardData from '../../toolkits/fetchRewardData';
export function useMuonCalimingReward() {
  const {writeContractAsync} = useWriteContract();
  const {data: blockNumber} = useBlockNumber();

  const chainID = useChainId({config});
  async function tryClaimReward(
    userWalletAddress: `0x${string}`,
    call: (input: string) => void
  ) {
    const pendingUnstakes = await readContract(config, {
      abi: stakingAbi,
      address: MUON_NODE_STAKING_ADDRESS[chainID.value],
      functionName: 'earned',
      args: [userWalletAddress]
    });
    console.log(pendingUnstakes);
    if (pendingUnstakes <= 0) {
      call(
        'The transaction was unsuccessful because there are no earned rewards to claim.'
      );
      return;
    }

    try {
      const response = await fetchRewardData(userWalletAddress, blockNumber);
      if (response === false) {
        call('The transaction was done unsuccessfully due to an unspecified problem');
        return;
      }
      await writeContractAsync(
        {
          abi: stakingAbi,
          address: MUON_NODE_STAKING_ADDRESS[chainID.value],
          functionName: 'getReward',
          args: [
            response.amount,
            response.paidRewardPerToken,
            response.reqId,
            {
              signature: response.signature,
              owner: response.owner,
              nonce: response.nonce
            }
          ]
          //chainId:
        },
        {
          onError: (error, variables, context) => {
            console.error('Error:', error.message);
            call(
              `The transaction was done unsuccessfully due to  this error ${error.message}`
            );
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
    tryClaimReward
  };
}
