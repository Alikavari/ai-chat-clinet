import {
  useWriteContract,
  readContractOnCurrentChainId,
  useChainId,
  config,
  stakingAbi as abi,
  aliceAbi,
  MUON_NODE_STAKING_ADDRESS,
  ALICE_ADDRESS,
  getCurrentChainId
} from './requriements';

export function useMuonBoost() {
  const {writeContractAsync} = useWriteContract();
  const chainID = useChainId({config});
  async function tryBoost(
    userWalletAddress: `0x${string}`,
    boostAmount: bigint,
    call: (input: string) => void
  ) {
    const allowanceAmount = await readContractOnCurrentChainId(config as any, {
      abi: aliceAbi,
      address: ALICE_ADDRESS[chainID.value],
      functionName: 'allowance',
      args: [userWalletAddress, MUON_NODE_STAKING_ADDRESS[chainID.value]]
    });
    console.log('allowance: ', allowanceAmount);
    console.log('boost: ', boostAmount);
    if (allowanceAmount < boostAmount) {
      call(
        'the transaction faild due to insufficent allowance the user should increase allowance amount then try to boosting'
      );
      return;
    }

    try {
      await writeContractAsync(
        {
          abi,
          address: MUON_NODE_STAKING_ADDRESS[chainID.value], // MUON_NODE_STAKING_ADDRESS[43113],
          functionName: 'lockToBondedToken',
          args: [[ALICE_ADDRESS[chainID.value]], [boostAmount]],
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
      //call('Transaction failed:' + err);
      //throw err;
    }
  }

  return {
    tryBoost
  };
}
