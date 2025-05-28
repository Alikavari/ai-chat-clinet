function objectToMarkdownTable(obj: Record<string, any>): string {
  const rows = Object.entries(obj).map(([key, value]) => `| ${key} | ${value} |`);
  const header = '| Key | Value |';
  const separator = '| --- | --- |';

  return [header, separator, ...rows].join('\n');
}

import {gettingNodeInfo} from '../web3/muonActions/readContractByname';

export async function onWalletConnet(userWalletAddress: `0x${string}`, chainID: number) {
  const obj = await gettingNodeInfo(userWalletAddress, chainID);
  if (obj.nodeId == 0)
    return `You haven’t set up a node yet. You can add one using the MUON chatbot.\n Your balance is ${obj.balance} `;
  return 'Here is yout node information \n' + objectToMarkdownTable(obj);
}
