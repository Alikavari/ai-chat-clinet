<script setup lang="ts">
  import {w3bNumberFromNumber} from '../web3/web3';
  import {useMuonTransfer} from '../web3/muonActions/useTransfer';
  import {useMuonApprove} from '../web3/muonActions/useApprove';
  import {useMuonAddNode} from '../web3/muonActions/useAddNode';
  import {useMuonUnstake} from '@/web3/muonActions/useUnstake';
  import {useMuonBoost} from '@/web3/muonActions/useBoost';
  import {useMuonCaliming} from '@/web3/muonActions/useClaim';
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
  async function writeContractRun() {
    console.log(props.userWalletAddress);
    if (props.toolName === 'transfer' && props.args != null) {
      const valueBig = w3bNumberFromNumber(props.args.value).big;
      const walletAddress = props.args?.destinationWalletAddress as `0x${string}`;
      await tryTransfer(walletAddress, valueBig, props.call);
    } else if (props.toolName === 'approve' && props.args != null) {
      const amountBig = w3bNumberFromNumber(props.args.value).big;
      await tryApprove(amountBig, props.call);
    } else if (props.toolName === 'add_node' && props.args != null) {
      const address = props.args?.nodeAddress;
      const peerID = props.args?.peerID;
      const amount = w3bNumberFromNumber(props.args?.amount).big;
      tryAddNode(address, peerID, amount, props.call);
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
    }
  }
</script>

<template>
  <button @click="writeContractRun()" class="my-button">Confirm</button>
  <button
    @click="props.call('the operation is rejected by user')"
    style="margin-left: 1em"
    class="my-button"
  >
    Reject
  </button>
</template>

<style>
  .my-button {
    background-color: #000000; /* Green background */
    color: white; /* White text */
    padding: 10px 20px; /* Padding around the text */
    border: none; /* No border */
    cursor: pointer; /* Cursor pointer on hover */
    border-radius: 5px; /* Rounded corners */
    font-size: 16px; /* Font size */
  }

  .my-button:hover {
    background-color: #45a049; /* Darker green on hover */
  }
</style>
