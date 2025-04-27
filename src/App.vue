<script setup lang="ts">
  import AppContents from '@/components/AppContents.vue';
  import AppHeader from '@/components/AppHeader.vue';
  import AppOptions from '@/components/AppSettings.vue';
  import AppAbout from '@/components/AppAbout.vue';
  import {createAppKit} from '@reown/appkit/vue';
  import {wagmiAdapter, networks, projectId} from './config/index';
  //import IndexButton from '@/components/IndexButton.vue';

  // Initialize AppKit
  const appkit = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    themeMode: 'light',
    features: {
      connectMethodsOrder: ['wallet'], //'email', 'social',
      analytics: true // Optional - defaults to your Cloud configuration
    },
    metadata: {
      name: 'AppKit Vue Example',
      description: 'AppKit Vue Example',
      url: 'https://reown.com/appkit',
      icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
    },
    themeVariables: {
      '--w3m-accent': '#000000'
    }
  });
</script>

<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <div style="background-image: url('/bg.png')" class="flex flex-col h-screen">
    <AppHeader />
    <div class="flex flex-1 overflow-hidden">
      <AppContents />
    </div>
  </div>
  <AppOptions />
  <AppAbout />
</template>

<style>
  /* Slim and custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px; /* Slim width */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Light gray track */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888; /* Darker thumb */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker color when hovered */
  }
</style>
