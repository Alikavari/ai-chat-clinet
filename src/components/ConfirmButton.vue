<script setup lang="ts">
  import {type ContrctNames} from '@/web3/writeContractNames';
  import {useWriteContract} from '@wagmi/vue';
  import {abi} from './abi';
  import {config} from './config';
  import {w3bNumberFromNumber} from '../web3/web3';
  //import {writeContract} from '@wagmi/core';
  const props = defineProps<{
    toolName: string | null | undefined;
    args: Record<string, any> | null;
    call: (name: string) => void;
  }>();

  const {writeContractAsync} = useWriteContract({});
  // Your logic here, like fetching data, accessing DOM, etc.

  async function writeContractRun() {
    console.log(props.toolName);
    console.log(props.args);
    if (props.toolName === 'transfer' && props.args != null) {
      console.log(props.args.value);
      const walletAddress = props.args?.destination_wallet_address as `0x${string}`;
      const value = props.args?.value as number;
      console.log('the user called tranfer');
      console.log('the bigint value: ', w3bNumberFromNumber(value).big);
      try {
        await writeContractAsync(
          {
            abi,
            address: '0x383FA34836A5F5D3805e77df4f60A62D75034579',
            functionName: props.toolName,
            args: [walletAddress, w3bNumberFromNumber(value).big]
            //chainId:
          },
          {
            onError: (error, variables, context) => {
              console.error('Error:', error.message);
              props.call(error.message);
            },
            onSuccess: (data, variables, context) => {
              console.log('Success:', data);
              props.call('the transaction done successfully');
            }
          }
        );
      } catch {
        //nothing
      }
    }
  }
</script>

<template>
  <button @click="writeContractRun()" class="my-button">Confirm</button>
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
