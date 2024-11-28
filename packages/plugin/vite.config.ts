import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: [resolve(__dirname, './src/plugin.ts'), resolve(__dirname, './src/component.ts')],
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', 'node:fs', 'node:path'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      watch: {
        include: ['src/**/*'],
      },
    },
  },
  plugins: [vue(), dts()],
});
