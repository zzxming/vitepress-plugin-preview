import type { BundledLanguage, BundledTheme, codeToHtml, HighlighterGeneric } from 'shiki';
import { createHighlighter } from 'shiki';

const defaultTheme = 'night-owl';
let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;

export interface LoadShikiOptions {
  themes: Parameters<typeof createHighlighter>[0]['themes'];
  langs: Parameters<typeof createHighlighter>[0]['langs'];
}
export const loadShiki = (options: LoadShikiOptions) => {
  return createHighlighter({
    themes: [defaultTheme, ...options.themes],
    langs: options.langs,
  })
    .then(h => highlighter = h);
};

export const highlight = (str: string, lang: string, options?: Partial<Omit<Parameters<typeof codeToHtml>[1], 'lang'>>) => {
  if (!lang) {
    return str;
  }
  return highlighter.codeToHtml(str, {
    theme: defaultTheme,
    ...options,
    lang: lang.toLowerCase(),
  });
};
