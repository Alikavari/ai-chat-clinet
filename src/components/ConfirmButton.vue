<script setup lang="ts">
  import {w3bNumberFromNumber} from '../web3/web3';
  import {useMuonTransfer} from '../web3/muonActions/useTransfer';
  import {useMuonApprove} from '../web3/muonActions/useApprove';
  import {useMuonAddNode} from '../web3/muonActions/useAddNode';

  import abi from '../abis/ALICE/BSCTestnet/ALICE';
  import abi2 from '../abis/ALICE/BSCTestnet/MuonNodeStaking';

  //import {writeContract} from '@wagmi/core';
  const props = defineProps<{
    toolName: string | null | undefined;
    args: Record<string, any> | null;
    call: (name: string) => void;
  }>();

  const {tryTransfer} = useMuonTransfer(abi);
  const {tryApprove} = useMuonApprove(abi);
  const {tryAddNode} = useMuonAddNode(abi2);

  async function writeContractRun() {
    // console.log(props.toolName);
    // console.log(props.args);
    if (props.toolName === 'transfer' && props.args != null) {
      const valueBig = w3bNumberFromNumber(props.args.value).big;
      const walletAddress = props.args?.destinationWalletAddress as `0x${string}`;
      await tryTransfer(walletAddress, valueBig, props.call);
    } else if (props.toolName === 'approve' && props.args != null) {
      const amountBig = w3bNumberFromNumber(props.args.value).big;
      const spenderAddress = props.args?.spenderAddress as `0x${string}`;
      await tryApprove(spenderAddress, amountBig, props.call);
    } else if (props.toolName === 'add_node' && props.args != null) {
      const address = props.args?.nodeAddress;
      const peerID = props.args?.peerID;
      const amount = w3bNumberFromNumber(props.args?.amount).big;
      tryAddNode(address, peerID, amount, props.call);
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
