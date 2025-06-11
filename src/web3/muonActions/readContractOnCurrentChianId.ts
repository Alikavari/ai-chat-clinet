import {getCurrentChainId} from '@/chains';
import type {Abi} from 'viem';
import type {ContractFunctionArgs, ContractFunctionName} from 'viem';
import {readContract, type Config} from '@wagmi/core'; // Correct import for Config type from wagmi/core
import type {
  ReadContractReturnType // Import this for precise return type if desired
} from '@wagmi/core';

type AbstractionReadContractParameters<
  TAbi extends Abi = Abi,
  TFunctionName extends ContractFunctionName<
    TAbi,
    'pure' | 'view'
  > = ContractFunctionName<TAbi, 'pure' | 'view'>,
  TArgs extends ContractFunctionArgs<
    TAbi,
    'pure' | 'view',
    TFunctionName
  > = ContractFunctionArgs<TAbi, 'pure' | 'view', TFunctionName>
> = {
  abi: TAbi;
  address: `0x${string}`;
  functionName: TFunctionName;
  args?: TArgs; // 'args' is optional in wagmi's parameters, so we reflect that here.
};

export async function readContractOnCurrentChainId<
  const TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, 'pure' | 'view'>,
  TArgs extends ContractFunctionArgs<TAbi, 'pure' | 'view', TFunctionName>
>(
  config: Config,
  parameters: AbstractionReadContractParameters<TAbi, TFunctionName, TArgs>
): Promise<ReadContractReturnType<TAbi, TFunctionName, TArgs>> {
  //onsole.log('the current chian id number: ', getCurrentChainId());
  const result = await readContract(config, {
    abi: parameters.abi,
    address: parameters.address,
    functionName: parameters.functionName,
    args: parameters.args,
    chainId: getCurrentChainId() // Your internal logic to get the current chain ID
  });
  return result;
}
