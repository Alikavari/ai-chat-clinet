import {
  config,
  stakingAbi,
  MUON_NODE_STAKING_ADDRESS,
  readContract
} from './requriements';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getclimableTime(chainID: number, userWalletAddress: `0x${string}`) {
  await delay(2000);
  const exitPeriod = await readContract(config, {
    abi: stakingAbi,
    address: MUON_NODE_STAKING_ADDRESS[chainID],
    functionName: 'exitPendingPeriod',
    args: []
  });
  const userUnstakeReqTime = await readContract(config, {
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
