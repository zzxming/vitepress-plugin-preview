<script lang="ts" setup>
import { ref } from 'vue'; // [!code highlight]
import { text } from './text'; // [!code ++]

const importText = ref(text); // [!code ++]
</script>

<template>
  <div>
    {{ importText }}
  </div>
</template>
