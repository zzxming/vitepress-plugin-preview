<script lang="ts" setup>
import { computed, ref } from 'vue';
import { defaultMutipleDemoFile } from '../utils';
import Code from './code.vue';
import Example from './example.vue';

const props = defineProps<{
  src: string;
  rawSource: string;
  source: string;
  files: string;
  isFile: boolean;
}>();

let originDefaultDemoFileIndex = -1;
const sortDefaultDemoFile = (sortArr: any[]) => {
  const arr = [...sortArr];
  if (originDefaultDemoFileIndex !== -1) {
    arr.splice(0, 0, arr.splice(originDefaultDemoFileIndex, 1)[0]);
  }
  return arr;
};
const filesPath = computed(() => {
  const files = props.files.split(',');
  originDefaultDemoFileIndex = files.indexOf(defaultMutipleDemoFile);
  if (originDefaultDemoFileIndex === -1) return files;
  return [defaultMutipleDemoFile, ...files.filter(f => f !== defaultMutipleDemoFile)];
});

const sourceArr = computed(() => sortDefaultDemoFile(props.source.split(',')));
const rawSourceArr = computed(() => sortDefaultDemoFile(props.rawSource.split(',')));

const index = ref(props.isFile ? 0 : filesPath.value.indexOf(defaultMutipleDemoFile));
const sourceCode = computed(() => sourceArr.value[index.value]);
const rawSourceCode = computed(() => rawSourceArr.value[index.value]);
const currentPath = computed(() => `${props.src}${!props.isFile ? `/${filesPath.value[index.value]}` : ''}`);
</script>

<template>
  <div class="vp-raw">
    <ClientOnly>
      <div class="example">
        <div v-if="$slots.default" class="description">
          <slot />
        </div>
        <Example>
          <slot name="component" />
        </Example>
        <Code
          v-model="index"
          :source="sourceCode"
          :raw-source="rawSourceCode"
          :path="currentPath"
          :files="filesPath"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.example {
  border: 1px solid #e5e5ec;
  border-radius: 6px;
}
.description {
  margin: 8px 0px;
  padding: 0px 16px;
}
</style>
