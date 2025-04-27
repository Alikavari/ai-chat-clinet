<script setup lang="ts">
  import {useAppStore} from '@/stores/app.store';
  import {Bars3Icon} from '@heroicons/vue/24/outline';
  import {Cog6ToothIcon} from '@heroicons/vue/24/outline';
  import {QuestionMarkCircleIcon} from '@heroicons/vue/24/outline';
  import {useSettingsStore} from '@/stores/settings.store';

  const appStore = useAppStore();
  const settingsStore = useSettingsStore();
  import {useWriteContract} from '@wagmi/vue';
  import {abi} from './abi';
</script>

<template>
  <div class="p-2 flex justify-between items-center">
    <!-- Left Icons Section -->
    <div class="left-icons">
      <div v-show="false" title="Toggle sidebar">
        <Bars3Icon
          class="h-6 w-6 text-gray-500 cursor-pointer hover:text-blue-600"
          @click="appStore.toggleSidebar()"
        />
      </div>
    </div>

    <!-- Right Icons Section -->
    <div class="right-icons">
      <appkit-button balance="hide" />
      <ActionButtonList />
      <!-- <div title="Show settings">
        <Cog6ToothIcon
          style="color: #2f4f4f"
          class="h-6 w-6 cursor-pointer hover:text-blue-600"
          @click="settingsStore.showSettings()"
        />
      </div> -->
      <div title="About">
        <QuestionMarkCircleIcon
          style="color: #2f4f4f"
          class="h-6 w-6 cursor-pointer hover:text-blue-600"
          @click="appStore.showAbout()"
        />
      </div>
    </div>
  </div>
</template>

<style>
  /* Ensures the entire container is flex and centered */
  .left-icons,
  .right-icons {
    display: flex;
    align-items: center; /* Ensures vertical centering */
    justify-content: center; /* Center the content horizontally in each section */
  }

  /* Adjust the space between items inside the right container */
  .left-icons {
    gap: 10px;
  }

  .right-icons {
    margin-left: auto; /* Pushes the content to the right */
    gap: 10px;
  }
</style>
