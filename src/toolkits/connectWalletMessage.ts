import {toTitleCase} from '../toolkits/caseToTitle';
import * as envts from '../../env.js';
function objectToMarkdownTable(obj: Record<string, any>): string {
  const rows = Object.entries(obj).map(
    ([key, value]) => `| ${toTitleCase(key)} | ${value} |`
  );

  const header = '| Key | Value |';
  const separator = '| --- | --- |';

  return ['\n', header, separator, ...rows].join('\n');
}
import {gettingNodeInfo, getclimableTime} from '../web3/muonActions/readContractByname';
const noNodeMessage = envts.VITE_PROJECT_NO_NODE_MESSAGE;
const whatIsMuonMessage = envts.VITE_PROJECT_WHAT_IS_MUON;
const nodeInfoMessage = envts.VITE_PROJECT_NODE_INFO;
export async function onWalletConnet(userWalletAddress: `0x${string}`, chainID: number) {
  const obj = await gettingNodeInfo(userWalletAddress, chainID);
  const cliamTime = await getclimableTime(chainID, userWalletAddress);
  if (obj.nodeId == 0) return `${noNodeMessage} ${obj.balance} \n ${whatIsMuonMessage}`;
  return `${nodeInfoMessage}` + objectToMarkdownTable(obj) + `\n\n${cliamTime}`;
}
