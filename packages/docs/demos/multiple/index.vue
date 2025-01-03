<script lang="ts" setup>
// [!code word:text]
import { ref } from 'vue'; // [!code highlight]
import { text } from './text'; // [!code warning]

const importText = ref(text);
</script>

<template>
  <div>
    {{ importText }} <!-- [!code ++] -->
  </div>
</template>
