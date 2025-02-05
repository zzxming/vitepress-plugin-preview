---
outline: deep
---

# Plugin Options

- `componentPath` (string): The base path to the import render components. default is `demos`.
- `prefix` (string): The prefix of the container in markdown. default is `demo`.

## componentPath

here is the example of project structure:

```
docs
├─ .vitepress
│  └─ config.mts
├─ guide
│  └─ start.md
└─ components
   ├─ base
   |  └─ demo.vue
   └─ demo.vue
```

and you want to import `demos/base/demo.vue` in `guide/start.md`, just need to set `componentPath` to `components` in `.vitepress/config.mts`, or you can use `path`:

```ts
import path from 'node:path';
import { defineConfig } from 'vitepress';
import { vitepressPreviewPlugin } from 'vitepress-plugin-preview/plugin';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressPreviewPlugin, {
        componentPath: path.resolve(__dirname, '../components'), // [!code ++]
      });
    },
  },
});
```

```md
render components/base/demo.vue
:::demo base/demo.vue
:::

render components/demo.vue
:::demo demo.vue
:::
```

### prefix

`prefix` is used to specify the container to render the preview component. if you change it to `#preview`, you can use it like this:

```md
:::#preview demo.vue
:::
```

### demoComponentPath

`demoComponentPath` is used to specify the path of the preview component. you can custom you own component to display code.

Assuming component location

```
docs
└─ .vitepress
   ├─ test.vue
   └─ config.mts
```

`test.vue` be like:

```vue {15-17}
<script lang="ts" setup>
import { demosProps, VitepressDemoPreview } from 'vitepress-plugin-preview/component';
import { useSlots } from 'vue';
import 'vitepress-plugin-preview/index.css';

const props = defineProps(demosProps);
const slots = useSlots();
</script>

<template>
  <VitepressDemoPreview>
    <template v-for="(slot, name) in slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
    <!-- add more icon button -->
    <template #icons>
      <button>icon</button>
    </template>
  </VitepressDemoPreview>
</template>
```

config plugin options:

```ts
md.use(vitepressPreviewPlugin, {
  demoComponentPath: '/.vitepress/test.vue',
});
```

more component detail see [component](https://github.com/zzxming/vitepress-plugin-preview/tree/main/packages/plugin/src/components)

## shiki

You can use `Shiki` transformers to highlight the code.

```ts
import { transformerNotationHighlight, } from '@shikijs/transformers';

export default defineConfig({
  // other configs...
  markdown: {
    config(md) {
      md.use(vitepressPreviewPlugin, {
        shiki: {
          langs: [], // shiki used langs
          themes: ['night-owl'], // default
          transformers: [transformerNotationHighlight()], // transformers that shiki used
          codeToHtmlOptions: { // arguments of `shiki.codeToHtml`
            theme: 'night-owl',
          },
        },
      });
    },
  },
});
```

:::demo multiple
:::
