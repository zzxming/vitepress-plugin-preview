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
