<script setup lang="ts">
import { onMounted, ref } from 'vue';
import 'quill/dist/quill.snow.css';

const editorRef = ref<HTMLElement | null>(null);

onMounted(() => {
  import('quill').then(({ default: Quill }) => {
    const quill = new Quill(editorRef.value!, { theme: 'snow' });
    console.log(quill);
  });
});
</script>

<template>
  <div ref="editorRef" />
</template>
