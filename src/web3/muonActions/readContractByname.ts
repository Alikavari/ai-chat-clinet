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
import fetchRewardData from '../../toolkits/fetchRewardData';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function gettingRewardBalance(
  chainID: number,
  userWalletAddress: `0x${string}`
) {
  const rewardBalanceRaw = await readContract(config as any, {
    abi: stakingAbi,
    address: MUON_NODE_STAKING_ADDRESS[chainID],
    functionName: 'earned',
    args: [userWalletAddress]
  });
  const decimalRewardBlance = w3bNumberFromBigint(rewardBalanceRaw).dsp;
  return decimalRewardBlance;
}
export async function gettingUnstakeBalance(
  chainID: number,
  userWalletAddress: `0x${string}`
) {
  const unstakeBalanceRow = await readContract(config as any, {
    abi: stakingAbi,
    address: MUON_NODE_STAKING_ADDRESS[chainID],
    functionName: 'pendingUnstakes',
    args: [userWalletAddress]
  });
  const decimalUnstakeBalance = w3bNumberFromBigint(unstakeBalanceRow).dsp;
  return decimalUnstakeBalance;
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
  const currentEpochSec = Math.floor(Date.now() / 1000);
  console.log('###############', chainID, userWalletAddress);
  const unstakeBalance = await gettingUnstakeBalance(chainID, userWalletAddress);
  if (unstakeBalance === 0) {
    return 'There is no unstake amount to claim';
  }
  if (currentEpochSec > claimableTime) {
    return 'You can get your claim right now';
  }
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
  return 'You can get your claim on ' + formattedDate;
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
  const decimalUnstakeBalance = await gettingUnstakeBalance(chainID, userWalletAddress);

  const decimalNodePower = w3bNumberFromBigint(rowNodePower).dsp;
  const decimalStakeAmount = w3bNumberFromBigint(rowStakedAmount).dsp;

  const rewardBalance = await gettingRewardBalance(
    chainID,
    userWalletAddress as `0x${string}`
  );
  return {
    stakerAddress,
    nodeAddress,
    peerId,
    status: active ? 'Online' : 'Offline',
    tier,
    nodeId: Number(id),
    nodePower: `${decimalNodePower} MUON$`,
    stakedAmount: `${decimalStakeAmount} MUON$`,
    balance: `${decimalBalance} MUON$`,
    unstakeBalance: `${decimalUnstakeBalance} MUON$`,
    rewardBalance: `${rewardBalance} MUON$`
    // pendingForClaimAmount: decimalPendingUnstakeAmount,
  };
}
