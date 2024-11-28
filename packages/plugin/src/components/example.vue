<script lang="ts" setup>
import { useDocBem } from '../composables';

const [, bem] = useDocBem('example');
</script>

<template>
  <div :class="bem.be('showcase')">
    <ClientOnly>
      <slot v-bind="$attrs" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.doc-example {
  &__showcase {
    position: relative;
    padding: 20px;
  }
}
</style>
