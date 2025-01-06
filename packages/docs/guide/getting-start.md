---
outline: deep
---

# Getting Started

## Manual Installation

```bash
pnpm i vitepress-plugin-preview -D
```

## Plugin Configuration

```ts
import { defineConfig } from 'vitepress';
import { vitepressPreviewPlugin } from 'vitepress-plugin-preview'; // [!code ++]

export default defineConfig({
  // other configs...
  markdown: { // [!code ++]
    config(md) { // [!code ++]
      md.use(vitepressPreviewPlugin, { // [!code ++]
        componentPath: 'demos', // [!code ++]
        prefix: 'demo', // [!code ++]
        shiki: { // [!code ++]
          langs: ['vue'] // [!code ++]
        } // [!code ++]
      }); // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
});
```

## Usage

```md
:::demo component.vue
:::
```

## Plugin Options

- `componentPath` (string): The base path to the import render components. default is `demos`.
- `prefix` (string): The prefix of the container in markdown. default is `demo`.

### componentPath

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

## Multiple Files

If your demo contains multiple files. You can put in a same directory and use `:::demo` to set the directory path. It will display all files in the directory and render `index.vue`.

```
docs
├─ guide
│  └─ start.md
└─ demos
   └─ base
      └─ index.vue
      └─ text.ts
```

```md
<!-- start.md -->

:::demo base
:::
```

## Shiki Support

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
