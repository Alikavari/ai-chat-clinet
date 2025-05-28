import {w3bNumberFromNumber} from './web3/web3';
import {getAllowance, getBalance} from './web3/muonActions/readContractByname';
import {Role} from '@/models/role.model';

export async function boostValidating(
  onSedMetamask: any,
  updateLastMessageStream: (messageChunk: string, role: Role) => Promise<void>,
  autoScrollDown: any,
  chainID: number,
  userWalletAddress: `0x${string}`,
  args: Record<string, any> | null,
  preContent: string
) {
  if (args === null) {
    onSedMetamask('Boosting failed—try again later');
    return false;
  }
  const boostingAmount = args.amount;
  const bigBoostingAmount: bigint = w3bNumberFromNumber(boostingAmount).big;
  const bigBalanceAmount: bigint = await getBalance(chainID, userWalletAddress);
  const bigAllownceAmount: bigint = await getAllowance(chainID, userWalletAddress);
  console.log('balance:', bigBalanceAmount);
  console.log('allowance: ', bigAllownceAmount);
  if (bigBoostingAmount > bigBalanceAmount) {
    console.log('insufficient balance');
    console.log(Role.hideAssistant);
    await updateLastMessageStream(preContent, Role.hideAssistant);
    autoScrollDown();
    onSedMetamask(
      `Insufficient allowance for boosting—first auto-call approve with ${boostingAmount}, then boost. Explain to user why approval is needed first.`,
      preContent
    );
    return false;
  }
  if (bigBoostingAmount > bigAllownceAmount) {
    console.log('insufficient allownce');
    console.log(Role.hideAssistant);
    console.log(preContent);
    await updateLastMessageStream(preContent, Role.assistant);
    autoScrollDown();
    onSedMetamask(
      'Boosting failed due to low balance—advise user to buy MUON coins',
      preContent
    );
    return false;
  } else return true;
}
