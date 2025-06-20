<script setup lang="ts">
  import {w3bNumberFromNumber} from '../web3/web3';
  import {useMuonTransfer} from '../web3/muonActions/useTransfer';
  import {useMuonApprove} from '../web3/muonActions/useApprove';
  import {useMuonAddNode} from '../web3/muonActions/useAddNode';
  import {useMuonUnstake} from '@/web3/muonActions/useUnstake';
  import {useMuonBoost} from '@/web3/muonActions/useBoost';
  import {useMuonCaliming} from '@/web3/muonActions/useClaim';
  import {useMuonCalimingReward} from '@/web3/muonActions/useClaimReward';
  //import {writeContract} from '@wagmi/core';
  const props = defineProps<{
    toolName: string | null | undefined;
    args: Record<string, any> | null;
    userWalletAddress: `0x${string}` | undefined;
    call: (name: string) => void;
  }>();

  const {tryTransfer} = useMuonTransfer();
  const {tryApprove} = useMuonApprove();
  const {tryAddNode} = useMuonAddNode();
  const {tryUnstake} = useMuonUnstake();
  const {tryBoost} = useMuonBoost();
  const {tryClaim} = useMuonCaliming();
  const {tryClaimReward} = useMuonCalimingReward();

  function snakeToTitle(input: string | null | undefined): string {
    if (!input) return '';
    return input
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  async function writeContractRun() {
    console.log(props.userWalletAddress);
    if (props.toolName === 'transfer' && props.args != null) {
      const valueBig = w3bNumberFromNumber(props.args.amount).big;
      const walletAddress = props.args?.destinationWalletAddress as `0x${string}`;
      await tryTransfer(walletAddress, valueBig, props.call);
    } else if (props.toolName === 'approve' && props.args != null) {
      const amountBig = w3bNumberFromNumber(props.args.amount).big;
      await tryApprove(amountBig, props.call);
    } else if (props.toolName === 'add_node' && props.args != null) {
      const address = props.args?.nodeAddress;
      const nodeIP = props.args?.nodeIP;
      const peerID = props.args?.peerID;
      const amount = w3bNumberFromNumber(props.args?.amount).big;
      tryAddNode(address, nodeIP, amount, peerID, props.call);
    } else if (props.toolName === 'unstake' && props.args != null) {
      if (props.userWalletAddress != undefined) {
        const amount = w3bNumberFromNumber(props.args?.amount).big;
        tryUnstake(props.userWalletAddress, amount, props.call);
      } else props.call('the transaction faid due to wallet connection problem');
    } else if (props.toolName === 'boost' && props.args?.amount != null) {
      const amount = w3bNumberFromNumber(props.args?.amount).big;
      if (props.userWalletAddress != undefined) {
        console.log('calling boost wallet address: ', props.userWalletAddress);
        tryBoost(props.userWalletAddress, amount, props.call);
      } else props.call('the transaction faid due to wallet connection problem');
    } else if (props.toolName === 'claim') {
      if (props.userWalletAddress != undefined) {
        console.log('calling boost wallet address: ', props.userWalletAddress);
        tryClaim(props.userWalletAddress, props.call);
      } else props.call('the transaction faid due to wallet connection problem');
    } else if (props.toolName === 'claim_reward') {
      if (props.userWalletAddress != undefined) {
        await tryClaimReward(props.userWalletAddress, props.call);
      }
    }
  }
</script>

<template>
  <button @click="writeContractRun()" class="my-button green-button">
    {{ snakeToTitle(props.toolName) }}
  </button>
  <button
    @click="props.call('the operation is rejected by user')"
    style="margin-left: 1em"
    class="my-button red-button"
  >
    Reject
  </button>
</template>

<style>
  .red-button {
    background-color: #a04545; /* Green background */
  }
  .red-button:hover {
    background: #bd8e8e; /* Darker green on hover */
  }

  .green-button {
    background-color: #45a049; /* Green background */
  }
  .green-button:hover {
    background-color: #8ebd90; /* Green background */
  }
  .my-button {
    color: white; /* White text */
    padding: 10px 20px; /* Padding around the text */
    border: none; /* No border */
    cursor: pointer; /* Cursor pointer on hover */
    border-radius: 5px; /* Rounded corners */
    font-size: 16px; /* Font size */
  }
</style>
