<script lang="ts" setup>
import { ref } from 'vue';
import { text } from './text';

const importText = ref(text);
</script>

<template>
  <div>
    {{ importText }}
  </div>
</template>
