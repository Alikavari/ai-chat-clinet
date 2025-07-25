<script setup lang="ts">
  import {computed, onMounted, ref, watch, nextTick} from 'vue';
  import OpenAI from 'openai';
  import type {ChatCompletionMessageParam} from 'openai/resources/chat/completions';
  import {Role} from '@/models/role.model';
  import {useChatStore} from '@/stores/chat.store';
  import MarkdownIt from 'markdown-it';
  import hljs from 'highlight.js';
  import {useSettingsStore} from '@/stores/settings.store';
  import {FwbAlert} from 'flowbite-vue';
  import {useAppStore} from '@/stores/app.store';
  import IndexButton from '@/components/ConfirmButton.vue';
  import SendButton from './SendButton.vue';
  import {config} from '../config';
  import {useAccount, useChainId} from '@wagmi/vue';
  import {type TransferArgs} from '../web3/writeContractArgs';
  import {getTimezoneBias} from '../toolkits/timeBias';
  import {onWalletConnet} from '../toolkits/connectWalletMessage';
  // Load environment variables from the .env file
  import {toTitleCase} from '../toolkits/caseToTitle';
  import {
    gettingRewardBalance,
    gettingUnstakeBalance
  } from '../web3/muonActions/readContractByname';
  import fetchRewardData from '../toolkits/fetchRewardData';
  import {useBlockNumber} from '@wagmi/vue';
  import {getAccount} from '@wagmi/core';
  import * as envts from '../../env.js';

  //TODO: use it if after fix reading env from docker build
  //const baseUrl = envts.VITE_PROJECT_PROXY_URL_DEV_OPEN_AI_URL;
  const baseUrl = envts.VITE_PROJECT_PROXY_URL_DEV_OPEN_AI_URL;
  const confirmMessage = envts.VITE_PROJECT_CONFIRM_MESSAGE;
  // Now you can access the environment variable
  let llmResponse: Message[];
  let llmLastResponse: Message = {role: 'null', content: 'null'};
  const chatTitle = envts.VITE_PROJECT_CHATBOT_TITLE;
  const textBoxPlaceHolderBegin = envts.VITE_PROJECT_PLACEHOLDER_BEGIN;
  const textBoxPlaceHolderPending = envts.VITE_PROJECT_PLACEHOLDER_PENDING;
  const isVisible = ref(false); // Define the reactive variable
  const input = ref('');
  const showChatbox = ref(true);
  const numOfInputRows = ref(1);
  const inputTextarea = ref<HTMLTextAreaElement | null>(null);
  const scrollingDiv = ref<HTMLElement | null>(null);
  const scrollContainer = ref<HTMLElement | null>(null);
  let userWalletAddress: `0x${string}` | undefined = undefined;
  let unstakeBalance: number;
  let rewardBalance: number;
  const aiResponse = ref(string);
  const userScrolled = ref(false);
  const pending = ref(false);
  const haveTool = ref(false);
  const beforeFirstMessage = ref({
    content: envts.VITE_PROJECT_PREDEFINED_MESSAGES,
    condition: false
  });
  const {data: blockNumber} = useBlockNumber();

  import {type ContrctNames} from '@/web3/writeContractNames';
  import {type FinalOutput, parseResponse} from '@/toolkits/decomposeText';
  import {alephZeroTestnet, flame} from 'viem/chains';
  import type {Message} from '@/models/message.model';
  import {any, number, string} from 'zod';
  const {status, address} = useAccount();
  const chainId = useChainId({config});

  watch(haveTool, async (newVal) => {
    if (newVal === true) {
      await nextTick(); // Wait for DOM update
      autoScrollDown();
    }
  });

  watch(status, async (newVal, preVal) => {
    if (newVal) {
      //console.log('connection status :', newVal);
      //console.log('address', address.value);
      //console.log(preVal);
      if (newVal === 'connected') {
        await onSendHideUser(
          `Event:The user entered with ${address.value} wallet address, run handle_wallet_connect tool, user timezone:${getTimezoneBias()}, `
        );
      }

      if (newVal === 'disconnected' && preVal == 'connected') {
        appStore.addError(
          'You have disconnected your wallet. Refresh page and connect wallet'
        );
        showChatbox.value = false;
        //pass
      }
      userWalletAddress = address.value;
    }
  });

  function modifyInputArgs(functionName: string, args: object) {
    if (functionName === 'claim') {
      return {Amount: unstakeBalance};
    }
    if (functionName === 'claim_reward') {
      return {Amount: rewardBalance};
    }
    return args;
  }
  //const modifiedArgs = modifyInputArgs(functionName, argsObj);

  function generateMarkdownTableFromArguments(functionName: string, argsObj: object) {
    //console.log('The function name is:', functionName);
    const modifiedArgs = modifyInputArgs(functionName, argsObj);
    let table = '| Parameter | Value |\n| --- | ----- |\n';

    for (const [k, v] of Object.entries(modifiedArgs)) {
      table += `| ${toTitleCase(k)} | ${v} |\n`;
    }

    return table;
  }
  interface ResMessageModel {
    role: string;
    content: any;
    tool_calls?: any[] | null;
    name?: string | null;
    tool_call_id?: string | null;
  }
  let modelOutput: FinalOutput = {
    resultText: '', // Default empty string or any initial value
    functionName: null, // Default value as null
    functionArgs: null // Default value as null or you can initialize it with an empty object if needed
  };

  const appStore = useAppStore();
  const chatStore = useChatStore();
  const settingsStore = useSettingsStore();

  // Inject the state from the parent component
  let showConfirmButton: boolean = false;
  let currentToolName: ContrctNames | undefined | null;
  let currentArgs: TransferArgs | undefined | null;
  const md = new MarkdownIt({
    breaks: true,
    linkify: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, {language: lang}).value;
        } catch (e) {
          console.log(e);
        }
      }
      return '';
    }
  });

  const isInputEnabled = computed(
    () => !pending.value //&& settingsStore.apiKey.length > 0
  );
  const isSendBtnEnabled = computed(
    () => input.value?.trim().length > 0 // && settingsStore.apiKey.trim().length > 0
  );

  const isChatEmpty = computed(
    () =>
      chatStore.currentChat === undefined || chatStore.currentChat.messages.length == 0
  );
  onMounted(() => {
    setTimeout(() => inputTextarea.value?.focus(), 100);
    setTimeout(() => console.log(inputTextarea.value), 200);
  });

  const openai = new OpenAI({
    apiKey: settingsStore.apiKey,
    dangerouslyAllowBrowser: true,
    baseURL: baseUrl
  });

  async function onSend() {
    pending.value = true;
    isVisible.value = false;
    try {
      const timsStamp = Math.trunc(Date.now() / 1000);
      userScrolled.value = false;
      inputTextarea.value?.blur();
      await chatStore.addMessage({
        role: Role.user,
        content: input.value //+ `\n\n##MEESAGE_TIMESTAMP==${timsStamp}`
      });
      autoScrollDown();
      sendRequestForTitle(input.value);
      input.value = '';
      await sendRequestForResponse();
    } catch (e) {
      if (e instanceof Error) {
        appStore.addError(e.message);
      }
    }
    pending.value = false;
    await nextTick();
    inputTextarea.value?.focus();
    if (containsTool(llmLastResponse)) {
      pending.value = true;
      inputTextarea.value?.blur();
    }
  }
  async function onSendHideUser(content: string) {
    beforeFirstMessage.value.condition = true;
    pending.value = true;
    isVisible.value = false;
    try {
      const timsStamp = Math.trunc(Date.now() / 1000);
      userScrolled.value = false;
      inputTextarea.value?.blur();
      await chatStore.addMessage({
        role: Role.hideUser,
        content: content //+`\n\n##MEESAGE_TIMESTAMP==${timsStamp}`
      });
      autoScrollDown();
      //sendRequestForTitle(input.value);
      input.value = '';
      //await sendRequestForResponse();
      const nodeInfoMessage = await onWalletConnet(
        address.value as `0x${string}`,
        chainId.value
      );
      await chatStore.updateLastMessageStream(` ${nodeInfoMessage}`);
    } catch (e) {
      if (e instanceof Error) {
        appStore.addError(e.message);
      }
    }
    beforeFirstMessage.value.condition = false;
    pending.value = false;
    await nextTick();
    inputTextarea.value?.focus();
    autoScrollDown();
  }
  async function onSendMetamask(metamaskMessage: string) {
    pending.value = true;
    isVisible.value = false;
    try {
      userScrolled.value = false;
      inputTextarea.value?.blur();
      let len = chatStore.currentChat?.messages.length as number;
      //console.log(chatStore.currentChat?.messages[len - 1].content);
      await chatStore.addMessage({
        role: 'tool',
        content: metamaskMessage,
        name: (chatStore.currentChat?.messages[len - 1].tool_calls as [any])[0].name,
        tool_call_id: (chatStore.currentChat?.messages[len - 1].tool_calls as [any])[0].id
      });
      autoScrollDown();
      sendRequestForTitle(input.value);
      input.value = '';
      await sendRequestForResponse();
    } catch (e) {
      if (e instanceof Error) {
        appStore.addError(e.message);
      }
    }
    pending.value = false;
    await nextTick();
    inputTextarea.value?.focus();
  }

  async function sendRequestForTitle(message: string) {
    if (chatStore.currentChat && !chatStore.currentChat.title) {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: Role.user,
            content:
              'Summarize the input as title of no more than 5 words.' +
              `Output only the summarized title. The input is: ${message}`
          }
        ],
        model: 'gpt-4o-mini',
        temperature: 0.5,
        max_tokens: 1000
      });
      await chatStore.setCurrentChatTitle(completion.choices[0].message.content);
    }
  }

  async function sendRequestForResponse() {
    if (chatStore.currentChat) {
      const stream = await openai.chat.completions.create({
        messages: chatStore.currentChat.messages as ChatCompletionMessageParam[],
        model: settingsStore.model,
        temperature: +settingsStore.temp,
        max_tokens: +settingsStore.maxTokens,
        stream: true
      });
      for await (const chunk of stream) {
        let content = chunk.choices[0]?.delta?.content || ' ';

        llmResponse = JSON.parse(content);
        //console.log('content:\n', llmResponse);
        for (const message of llmResponse) {
          if (
            message.role === Role.assistant &&
            message.tool_calls != null &&
            message.tool_calls.length > 0 &&
            ['climable_time', 'get_variables', 'check_for_adding_node'].includes(
              message.tool_calls[0]['name']
            )
          ) {
            //console.log('the tool calls', message.tool_calls);
            message.role = 'hideAssistant';
          }
          if (userWalletAddress != null && chainId.value != null) {
            unstakeBalance = await gettingUnstakeBalance(
              chainId.value,
              userWalletAddress as `0x${string}`
            );
            rewardBalance = await gettingRewardBalance(
              chainId.value,
              userWalletAddress as `0x${string}`
            );
          }

          //console.log(`###rewardBalance: ${rewardBalance}`);
          await chatStore.addMessage({
            role: message.role,
            content: message.content + ' ',
            tool_calls: message.tool_calls,
            tool_call_id: message.tool_call_id
          });
          //console.log(chatStore.currentChat.messages);
        }
        llmLastResponse = llmResponse[llmResponse.length - 1];

        autoScrollDown();
        break;
      }
    }
  }

  function autoScrollDown() {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTo({
        top: scrollContainer.value.scrollHeight,
        behavior: 'smooth'
      });
    }
    if (scrollingDiv.value && !userScrolled.value) {
      scrollingDiv.value.scrollTop = scrollingDiv.value.scrollHeight;
    }
  }

  function checkIfUserScrolled() {
    if (scrollingDiv.value) {
      userScrolled.value =
        scrollingDiv.value.scrollTop + scrollingDiv.value.clientHeight !==
        scrollingDiv.value.scrollHeight;
    }
  }

  watch(
    () => settingsStore.apiKey,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        openai.apiKey = settingsStore.apiKey;
      }
    }
  );
  const handleEnter = (event: any) => {
    if (event.shiftKey) return; // Allow newline with Shift+Enter

    event.preventDefault(); // Prevent newline on regular Enter
    onSend();
  };

  function showConfirmationMessage(message: Message) {
    if (
      message.tool_calls === undefined ||
      message.tool_calls === null ||
      message.tool_calls?.length === 0
    ) {
      //console.log('content', message.content);
      return message.content as string;
    }
    return (
      message.content +
      `${confirmMessage} ${message.tool_calls[0]['name']}\:\n\n` +
      generateMarkdownTableFromArguments(
        message.tool_calls[0]['name'],
        message.tool_calls[0]['args']
      )
    );
  }
  function gettingToolName(message: Message) {
    if (
      message === undefined ||
      message.tool_calls === undefined ||
      message.tool_calls === null ||
      message.tool_calls?.length === 0
    ) {
      //console.log('the_messages', message);
      return 'undefined';
    }
    //console.log(message.role);
    return message.tool_calls[0]['name'];
  }

  function gettingToolArgs(message: Message) {
    if (
      message === undefined ||
      message.tool_calls == undefined ||
      message.tool_calls == null ||
      message.tool_calls?.length === 0
    ) {
      return {};
    }

    return message.tool_calls[0]['args'];
  }
  function containsTool(message: Message) {
    haveTool.value = false;
    if (
      message === undefined ||
      message.tool_calls == undefined ||
      message.tool_calls == null ||
      message.tool_calls?.length === 0
    ) {
      return false;
    }
    haveTool.value = true;
    return true;
  }
</script>

<template>
  <div
    :class="{'justify-center': isChatEmpty}"
    class="flex flex-1 flex-col overflow-auto"
  >
    <fwb-alert
      closable
      type="danger"
      class="mt-4 ml-4 mr-4 gap-0"
      v-for="error in appStore.errors"
      :key="error.id"
      @close="appStore.removeError(error.id)"
    >
      {{ error.message }}
    </fwb-alert>
    <p v-show="isChatEmpty" class="text-center text-2xl font-bold font-arial">
      {{ chatTitle }}
    </p>

    <div ref="scrollContainer" v-show="!isChatEmpty" class="main-container">
      <main
        class="flex-1 p-4 chat-container"
        ref="scrollingDiv"
        @scroll="checkIfUserScrolled()"
      >
        <div v-show="beforeFirstMessage.condition">
          {{ beforeFirstMessage.content }}
        </div>
        <template v-if="chatStore.currentChat">
          <template
            v-for="(message, index) in chatStore.currentChat.messages"
            :key="index"
          >
            <template v-if="message.content && message.role === Role.user">
              <div class="justify-end inner-content flex">
                <div
                  :style="{backgroundColor: 'rgba(200, 200, 200,0.5)'}"
                  class="bg-gray-100 py-2 px-3 rounded mb-4 message-content message"
                  v-html="md.render(message.content)"
                />
              </div>
            </template>

            <template v-if="message.content && message.role === Role.assistant">
              <div class="inner-content">
                <div
                  class="py-2 px-3 rounded mb-4 ml-5 message-content"
                  v-html="md.render(showConfirmationMessage(message))"
                />
              </div>
            </template>
          </template>
        </template>
        <div style="margin-left: 2em" v-show="containsTool(llmLastResponse)">
          <IndexButton
            :toolName="gettingToolName(llmLastResponse)"
            :args="gettingToolArgs(llmLastResponse)"
            :userWalletAddress="userWalletAddress"
            :call="onSendMetamask"
          />
        </div>
      </main>
    </div>
    <div
      class="flex w-full p-4 chat-container"
      @focusin="numOfInputRows = 1"
      @focusout="numOfInputRows = 1"
    >
      <div
        v-show="showChatbox"
        class="p-2 overflow-x-hidden w-full text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white flex items-center"
      >
        <textarea
          class="p-2 text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white flex-1"
          style="resize: none; box-shadow: none; border: none"
          :rows="numOfInputRows"
          :placeholder="pending ? textBoxPlaceHolderPending : textBoxPlaceHolderBegin"
          ref="inputTextarea"
          v-model="input"
          @keydown.enter="handleEnter"
          :disabled="!isInputEnabled"
        />
        <SendButton :disabled="false" :isSending="pending" @Click="onSend" class="ml-2" />
      </div>
    </div>
  </div>
</template>

<style>
  @import '../../node_modules/highlight.js/styles/github.css';

  .message-container {
    display: flex;
    justify-content: flex-end; /* Align messages to the right */
    width: 100%; /* Make sure the container takes full width */
    overflow-x: auto; /* Allow horizontal scrolling if needed */
    word-wrap: break-word; /* Break long words to fit into the container */
    flex-wrap: wrap; /* Allow wrapping of messages if needed */
  }
  .message {
    background-color: #f1f1f1; /* Optional background color */
    border-radius: 10px; /* Optional: rounded corners */
    padding: 10px; /* Optional padding */
    max-width: 90%; /* Prevent the message from overflowing */
    white-space: normal; /* Allow text to wrap */
    word-wrap: break-word; /* Break words that are too long */
    overflow-wrap: break-word; /* Ensure long words break */
  }
  .message-content {
    pre:not(:last-child),
    p:not(:last-child),
    ol:not(:last-child),
    ul:not(:last-child),
    li:not(:last-child),
    table:not(:last-child),
    blockquote:not(:last-child),
    hr:not(:last-child),
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0.5rem;
    }

    blockquote {
      margin-left: 1rem;
      font-style: italic;
    }

    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1.25rem;
    }

    h3 {
      font-size: 1.125rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: bold;
      margin-top: 1rem;
    }

    pre {
      margin-left: 1rem;
      background-color: rgb(249 250 251);
      display: table;
      border-radius: 5px;
      padding: 0 5px;
      white-space: pre-wrap;
    }

    code:not(pre code) {
      background-color: rgb(249 250 251);
      border-radius: 5px;
      padding: 0 1px;
    }

    a {
      color: rgb(37 99 235);
    }

    ul {
      list-style-type: disc;
      margin-left: 2rem;
    }

    ol {
      list-style-type: decimal;
      margin-left: 2rem;
    }
  }
  .child {
    position: absolute;
    top: 50%;
    left: 50%;
    /* Shift the element back by half its width/height */
  }

  .main-container {
    flex: 1;
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: flex-start; /* Keep content at the top */
    overflow-y: auto; /* Scrollbar remains in this container */
    width: 100%;
    max-width: 100%; /* Ensure it does not overflow */
  }

  /* Shrunk content area */
  .chat-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    width: 100%;
    min-width: 10%; /* Prevent the content from forcing the parent to grow */
    overflow-x: hidden; /* Prevent horizontal scrolling */
    display: flex;
    flex-direction: column;
    table-layout: fixed; /* Ensure content does not stretch */
  }

  .text-zone {
    width: 100%;
    height: 200px;
    margin-top: 1rem;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    resize: vertical;
  }

  .inner-content {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0; /* Ensure it shrinks */
    overflow-wrap: break-word; /* Ensure words break to fit inside */
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
  }
  thead {
    text-align: left;
  }
  th,
  td {
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }
  th {
    font-weight: 600;
    color: #000;
  }
  td {
    color: #333;
  }
  tr:last-child td {
    border-bottom: none;
  }
  .container {
    max-width: 800px;
    margin: auto;
  }
  .transparent-box {
    width: auto;
    height: 40px;
    background-color: rgba(17, 0, 255, 0.5); /* red with 50% transparency */
    color: rgb(250, 250, 250);
    padding: 10px;
    border-radius: 8px;
  }
</style>
