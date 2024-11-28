<script setup lang="ts">
import { useDocBem } from '../composables';

defineOptions({ name: 'CdxCollapseTransition' });

const [, bem] = useDocBem('collapse-transition');

const elStyle: Partial<CSSStyleDeclaration> = {};
const resetStyle = (el: HTMLElement) => {
  Object.assign(el.style, {
    ...elStyle,
    maxHeight: null,
    boxSizing: null,
  });
};
const events = {
  beforeEnter(el: HTMLElement) {
    elStyle.paddingTop = el.style.paddingTop;
    elStyle.paddingBottom = el.style.paddingBottom;
    elStyle.marginTop = el.style.marginTop;
    elStyle.marginBottom = el.style.marginBottom;
    elStyle.boxSizing = el.style.boxSizing;

    Object.assign(el.style, {
      maxHeight: '0',
      marginTop: '0',
      marginBottom: '0',
      paddingTop: '0',
      paddingBottom: '0',
      boxSizing: 'content-box',
    });
  },
  enter(el: HTMLElement) {
    elStyle.overflow = el.style.overflow;
    Object.assign(el.style, {
      ...elStyle,
      maxHeight: el.scrollHeight ? `${el.scrollHeight}px` : '0',
      boxSizing: 'content-box',
      overflow: 'hidden',
    });
  },
  afterEnter(el: HTMLElement) {
    Object.assign(el.style, {
      maxHeight: null,
      overflow: elStyle.overflow,
    });
  },
  enterCancelled(el: HTMLElement) {
    resetStyle(el);
  },

  beforeLeave(el: HTMLElement) {
    elStyle.paddingTop = el.style.paddingTop;
    elStyle.paddingBottom = el.style.paddingBottom;
    elStyle.overflow = el.style.overflow;
    elStyle.marginTop = el.style.marginTop;
    elStyle.marginBottom = el.style.marginBottom;
    elStyle.boxSizing = el.style.boxSizing;

    Object.assign(el.style, {
      maxHeight: `${el.scrollHeight}px` || '',
      boxSizing: 'content-box',
      overflow: 'hidden',
    });
  },
  leave(el: HTMLElement) {
    if (el.scrollHeight !== 0) {
      Object.assign(el.style, {
        maxHeight: '0',
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        marginBottom: '0',
      });
    }
  },
  afterLeave(el: HTMLElement) {
    resetStyle(el);
  },
  leaveCancelled(el: HTMLElement) {
    resetStyle(el);
  },
};
</script>

<template>
  <Transition
    :name="bem.b()"
    v-on="events"
  >
    <slot />
  </Transition>
</template>

<style scoped lang="scss">
.doc-collapse-transition {
  &-enter-active,
  &-leave-active {
    transition-property: max-height, padding, margin;
    transition-timing-function: ease-in-out;
    transition-duration: 0.25s;
  }
}
</style>
