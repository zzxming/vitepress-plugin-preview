import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';
import { bundledLanguages, createHighlighter } from 'shiki';

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;

export const loadShiki = (options?: Partial<Parameters<typeof createHighlighter>>) => {
  return createHighlighter({
    themes: ['vitesse-dark'],
    langs: Object.keys(bundledLanguages),
    ...options,
  })
    .then(h => highlighter = h);
};
export const highlight = (str: string, lang: string, codeToHtmlOptions?: Parameters<typeof highlighter.codeToHtml>[1]) => {
  if (!lang) {
    return str;
  }
  return highlighter.codeToHtml(str, {
    theme: 'vitesse-dark',
    ...codeToHtmlOptions,
    lang: lang.toLowerCase(),
  });
};
