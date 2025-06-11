import axios from 'axios';

import * as envts from '../../env.js';
const BASEURL = envts.VITE_PROJECT_APP_MUON_V1_URL_DEV;

// console.log(BASEURL);
// import.meta.env.NODE_ENV !== 'production'
//   ? import.meta.env.VITE_PROJECT_APP_MUON_V1_URL_DEV
//   : '';

const fetchRewardData = async (stakerAddress: any, blockNumber: any) => {
  const response = await axios.get(
    `${BASEURL}/v1/?app=muon_tss_reward_oracle&method=reward&params[stakerAddress]=${stakerAddress}&params[blockNumber]=${blockNumber.toString()}`
  );
  // const response = await axios.get(
  //   ${BASEURL}/poa/?app=tss_reward_oracle&method=reward&params[stakerAddress]=${staker}&params[blockNumber]=${blockNumber}
  // );
  if (!response.data.success) return false;
  else {
    const data = response.data;
    return {
      amount: data.result.data.result.reward,
      paidRewardPerToken: data.result.data.result.rewardPerToken,
      reqId: data.result.reqId,
      signature: data.result.signatures[0].signature,
      owner: data.result.signatures[0].owner,
      nonce: data.result.data.init.nonceAddress
    };
  }
};

export default fetchRewardData;
