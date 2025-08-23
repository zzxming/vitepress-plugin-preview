# SSR Component

When a component uses libraries that do not support Server-Side Rendering (SSR), and you don't want to write compatibility code in your project, you can use this approach to handle such scenarios.

## Useage

```md
:::demo component.vue{async}
:::
```

## Example

Lib that usually do not support SSR components can be use like this in SSR(Using `Quill` as an example here)

:::demo normal-ssr-component
:::

But if you want to use a component that does not support SSR in SSR, you can use the `async` attribute to wrap the component.

:::demo async-ssr-component{async}
:::
