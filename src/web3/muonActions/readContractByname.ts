import {
  config,
  stakingAbi,
  aliceAbi,
  managerAbi,
  MUON_NODE_STAKING_ADDRESS,
  MUON_NODE_MANAGER_ADDRESS,
  ALICE_ADDRESS,
  readContract
} from './requriements';

import {w3bNumberFromBigint} from '../web3';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getclimableTime(chainID: number, userWalletAddress: `0x${string}`) {
  const exitPeriod = await readContract(config as any, {
    abi: stakingAbi,
    address: MUON_NODE_STAKING_ADDRESS[chainID],
    functionName: 'exitPendingPeriod',
    args: []
  });
  const userUnstakeReqTime = await readContract(config as any, {
    abi: stakingAbi,
    address: MUON_NODE_STAKING_ADDRESS[chainID],
    functionName: 'unstakeReqTimes',
    args: [userWalletAddress]
  });
  const claimableTime = userUnstakeReqTime + exitPeriod;
  const claimDate = new Date(Number(claimableTime) * 1000);
  const datePart = claimDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const timePart = claimDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const formattedDate = `${datePart.replace(' ', '').replace(', ', ',')} - ${timePart}`;
  console.log('a', userUnstakeReqTime, ' ', exitPeriod);
  return formattedDate;
}

export async function gettingUsers(userWalletAddress: `0x${string}`, chainID: number) {
  const stakingAddress = MUON_NODE_STAKING_ADDRESS[chainID];
}
export async function gettingBalance(userWalletAddress: `0x${string}`, chainID: number) {
  const aliceAddress = ALICE_ADDRESS[chainID];
  const rowBalance = await readContract(config as any, {
    abi: aliceAbi,
    address: aliceAddress,
    functionName: 'balanceOf',
    args: [userWalletAddress]
  });
  const decimalBalance = w3bNumberFromBigint(rowBalance).dsp;
  return decimalBalance;
}
export async function gettingNodeInfo(userWalletAddress: `0x${string}`, chainID: number) {
  const managerAddress = MUON_NODE_MANAGER_ADDRESS[chainID];
  const stakingAddress = MUON_NODE_STAKING_ADDRESS[chainID];
  const aliceAddress = ALICE_ADDRESS[chainID];

  // stakerAddressInfo
  const stakerInfo = await readContract(config as any, {
    abi: managerAbi,
    address: managerAddress,
    functionName: 'stakerAddressInfo',
    args: [userWalletAddress]
  });

  const {id, stakerAddress, nodeAddress, peerId, active, tier} = stakerInfo;
  const decimalBalance = await gettingBalance(userWalletAddress, chainID);
  const [rowNodePower, untitle1, untitle2, untitle3, tokenID] = await readContract(
    config as any,
    {
      abi: stakingAbi,
      address: stakingAddress,
      functionName: 'users',
      args: [userWalletAddress]
    }
  );

  const rowStakedAmount = await readContract(config as any, {
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'valueOfBondedToken',
    args: [tokenID]
  });
  const decimalNodePower = w3bNumberFromBigint(rowNodePower).dsp;
  const decimalStakeAmount = w3bNumberFromBigint(rowStakedAmount).dsp;

  return {
    stakerAddress,
    nodeAddress,
    peerId,
    active: active ? 'online' : 'offline',
    tier,
    nodeId: Number(id),
    nodePower: decimalNodePower,
    stakedAmount: decimalStakeAmount,
    balance: `${decimalBalance} MUON$`
    // pendingForClaimAmount: decimalPendingUnstakeAmount,
  };
}
