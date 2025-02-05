<script lang="ts" setup>
import { demosProps, VitepressDemoPreview } from 'vitepress-plugin-preview/component';
import { useSlots } from 'vue';
import 'vitepress-plugin-preview/index.css';

const props = defineProps(demosProps);
const slots = useSlots();
console.log(props);
</script>

<template>
  <VitepressDemoPreview v-bind="props">
    <template v-for="(slot, name) in slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
    <template #icons>
      <button>other icon</button>
    </template>
  </VitepressDemoPreview>
</template>
