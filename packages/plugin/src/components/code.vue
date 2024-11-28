<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useDocBem } from '../composables';
import CollapseTransition from './collapse-transition.vue';

const props = defineProps<{
  modelValue: number;
  source: string;
  rawSource: string;
  path: string;
  files: string[];
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const [, bem] = useDocBem('example');

const isExpand = ref(false);

const exampleCodeText = computed(() => (isExpand.value ? '隐藏源代码' : '查看源代码'));
const code = computed(() => decodeURIComponent(props.source));
const rawCode = computed(() => decodeURIComponent(props.rawSource));

const copyCode = () => {
  const ta = document.createElement('textarea');
  ta.value = rawCode.value;
  ta.style.position = 'absolute';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
};
const toggleExpand = () => {
  isExpand.value = !isExpand.value;
};
</script>

<template>
  <div :class="bem.be('code')">
    <div :class="bem.be('actions')">
      <i
        :class="[bem.be('icon'), bem.be('actions-btn')]"
        title="复制代码"
        @click="copyCode"
      >
        <Icon icon="ic:baseline-content-copy" />
      </i>
      <i
        :class="[bem.be('icon'), bem.be('actions-btn')]"
        title="查看源代码"
        @click="toggleExpand"
      >
        <Icon icon="ic:baseline-data-object" />
      </i>
    </div>
    <CollapseTransition>
      <div
        v-show="isExpand"
        :class="bem.be('code-wrapper')"
      >
        <div
          v-if="files.length > 1"
          :class="bem.be('code-list')"
        >
          <div
            v-for="(file, i) in files"
            :key="file"
            :class="[bem.be('code-file'), i === modelValue && bem.bem('code-file', 'active')]"
            plain
            @click="emit('update:modelValue', i)"
          >
            {{ file }}
          </div>
        </div>
        <div
          class="language-vue" :class="[bem.be('code-inner')]"
          v-html="code"
        />
      </div>
    </CollapseTransition>
    <div
      v-show="isExpand"
      :class="bem.be('code-expand')"
      @click="toggleExpand"
    >
      {{ exampleCodeText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.doc-example {
  &__icon {
    width: 1em;
    height: 1em;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    fill: currentColor;
  }
  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 8px 16px;
    border-top: 1px solid var(--vp-c-gray-2);
    &-btn {
      margin: 0px 4px;
      color: var(--vp-c-text-3);
      cursor: pointer;
      &:hover {
        color: var(--vp-c-text-1);
      }
    }
  }
  &__code {
    &-list {
      display: flex;
      align-items: center;
      padding-bottom: 8px;
      background-color: var(--vp-code-block-bg);
    }
    &-file {
      padding: 8px 12px;
      border: 2px solid transparent;
      cursor: pointer;
      &:hover {
        background-color: rgba(33, 150, 243, 0.1);
      }
      &--active {
        border-bottom-color: #d3eafd;
      }
    }
    &-wrapper {
      overflow: hidden;
    }
    &-expand {
      color: var(--vp-c-text-2);
      background-color: var(--vp-c-bg);
      position: sticky;
      bottom: 0;
      z-index: 10;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-top: 1px solid var(--vp-c-gray-2);
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      cursor: pointer;
      &:hover {
        color: var(--vp-c-text-1);
      }
    }
    &-inner[class*='language-'] {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>
