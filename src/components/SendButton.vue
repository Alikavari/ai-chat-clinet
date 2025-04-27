<script setup>
  import {defineProps, defineEmits} from 'vue';

  // Define props
  const props = defineProps({
    isSending: Boolean, // Determines the button state (Send or Stop)
    disabled: Boolean,
    onClick: Function
  });

  // Emit event on button click
  const emit = defineEmits(['click']);
</script>

<template>
  <button :disabled="disabled" class="send-button" @click="emit('click')">
    <svg v-if="!isSending" viewBox="0 0 24 24">
      <!-- Send Icon -->
      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
    </svg>
    <svg v-else viewBox="0 0 24 24">
      <!-- Stop Icon -->
      <path d="M6 6h12v12H6z" />
    </svg>
  </button>
</template>

<style scoped>
  .send-button {
    width: 40px;
    height: 40px;
    background-color: #000;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s;
  }

  .send-button:hover {
    background-color: #333;
  }

  .send-button svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
</style>
