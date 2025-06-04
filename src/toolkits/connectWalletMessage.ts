import {toTitleCase} from '../toolkits/caseToTitle';
function objectToMarkdownTable(obj: Record<string, any>): string {
  const rows = Object.entries(obj).map(
    ([key, value]) => `| ${toTitleCase(key)} | ${value} |`
  );

  const header = '| Key | Value |';
  const separator = '| --- | --- |';

  return [header, separator, ...rows].join('\n');
}
import {gettingNodeInfo, getclimableTime} from '../web3/muonActions/readContractByname';

export async function onWalletConnet(userWalletAddress: `0x${string}`, chainID: number) {
  const obj = await gettingNodeInfo(userWalletAddress, chainID);
  const cliamTime = await getclimableTime(chainID, userWalletAddress);
  if (obj.nodeId == 0)
    return `You haven’t set up a node yet. You can add one using the MUON chatbot.\n Your balance is ${obj.balance} `;
  return 'Here is yout node inof. \n' + objectToMarkdownTable(obj) + `\n\n${cliamTime}`;
}
