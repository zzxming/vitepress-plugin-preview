import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

export const define = <T>(value: T): T => value;
export default define<Theme>({
  ...DefaultTheme,
});
