import { defineConfig } from 'vitepress';
import { vitepressPreviewPlugin } from 'vitepress-plugin-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-plugin-preview/',
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-start' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Getting Start', link: '/guide/getting-start' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/zzxming/vitepress-plugin-preview' }],
  },
  markdown: {
    config(md) {
      md.use(vitepressPreviewPlugin);
    },
  },
});
