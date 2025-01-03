import type MarkdownIt from 'markdown-it';
import type { Renderer, Token } from 'markdown-it';
import type { LoadShikiOptions } from './highlight';
import fs from 'node:fs';
import path from 'node:path';
import mdContainer from 'markdown-it-container';
import { defaultMutipleDemoFile } from '../utils';
import { highlight, loadShiki } from './highlight';
import { getAllFiles, injectImport, isFile, normalizePath, readFile, toPascalCase } from './utils';

export interface DemoContainerOptions {
  componentPath: string;
  prefix: string;
  shiki: ShikiOptions;
}
export interface ShikiOptions extends LoadShikiOptions {
  codeToHtmlOptions: Parameters<typeof highlight>[2];
}

function resolveShikiOptions(options?: Partial<ShikiOptions>) {
  const {
    themes = [],
    langs = [],
    codeToHtmlOptions = {},
  } = options || {};
  return {
    themes,
    langs,
    codeToHtmlOptions,
  };
}
function resolveOptions(options?: Partial<DemoContainerOptions>): DemoContainerOptions {
  const {
    componentPath = 'demos',
    prefix = 'demo',
    shiki,
  } = options || {};
  return {
    componentPath,
    prefix,
    shiki: resolveShikiOptions(shiki),
  };
}
function tempCodeName(componentsPath: string, filePath: string) {
  const ext = path.extname(filePath);
  const paths = normalizePath(filePath.split(componentsPath).slice(-1)[0].split(ext)[0]).split('/');
  const pascalName = paths.map(p => toPascalCase(p)).join('') + toPascalCase(ext.replace('.', ''));
  return `TempCode${toPascalCase(pascalName)}`;
}
function useDemoImport(md: MarkdownIt, options?: DemoContainerOptions) {
  const {
    componentPath,
    prefix,
  } = resolveOptions(options);
  const containerName = `container_${prefix}_open`;

  const defaultContainer = md.renderer.rules[containerName]!;

  md.renderer.rules[containerName] = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    mdFile: any,
    self: Renderer,
  ) => {
    const previewFilePaths = getAllFiles(componentPath);
    for (const filePath of previewFilePaths) {
      const importName = tempCodeName(componentPath, filePath);
      const importPath = `/${normalizePath(filePath)}`;
      injectImport(mdFile, importPath, importName);
    }
    injectImport(mdFile, 'vitepress-plugin-preview', '{ VitepressDemoPreview }');
    injectImport(mdFile, 'vitepress-plugin-preview/index.css');
    return defaultContainer(tokens, idx, options, mdFile, self);
  };
}

async function createDemoContainer(md: MarkdownIt, options?: DemoContainerOptions) {
  const {
    componentPath,
    prefix,
    shiki,
  } = resolveOptions(options);
  const prefixMatchReg = new RegExp(`^${prefix}\s*(.*)$`);
  await loadShiki(shiki);
  return [
    mdContainer,
    prefix,
    {
      validate(params: string) {
        return !!prefixMatchReg.test(params.trim());
      },
      render(tokens: Token[], idx: number, _: MarkdownIt.Options) {
        const token = tokens[idx];

        if (token.nesting === 1) {
          const matched = token.info.trim().match(prefixMatchReg);
          const params = matched?.[1].trim().split(/\s+/) || [];
          let src = params[0];

          let importIsFile = true;
          const sourceMap: Record<string, string> = {};
          const filePath = src;
          let componentName = '';
          if (isFile(path.resolve('.', componentPath, filePath))) {
            src = filePath;
            sourceMap[filePath] = readFile(path.resolve('.', componentPath, filePath));
            componentName = tempCodeName(componentPath, filePath);
          }
          else {
            // multiple files
            importIsFile = false;
            const dirPath = path.resolve('.', componentPath, src);
            // only same name dir
            const files = fs.readdirSync(dirPath);
            for (const item of files) {
              const filePath = path.join(dirPath, item);
              if (isFile(filePath)) {
                // default use 'defaultMutipleDemoFile' as render file
                if (path.basename(filePath) === defaultMutipleDemoFile) {
                  componentName = tempCodeName(componentPath, filePath);
                }
                sourceMap[item] = readFile(filePath);
              }
            }
          }

          return `<VitepressDemoPreview
            raw-source="${Object.values(sourceMap).map(s => encodeURIComponent(s)).join(',')}"
            source="${Object.entries(sourceMap).map(([s, code]) => encodeURIComponent(highlight(code, path.extname(s).split('.')[1], shiki.codeToHtmlOptions))).join(',')}"
            files="${Object.keys(sourceMap).join(',')}"
            src="${src}"
            :isFile="${importIsFile}"
          >\n${
            componentName
              ? `<template #component>
              <${componentName} />
            </template>`
              : ''
          }`;
        }
        else {
          return '</VitepressDemoPreview>\n';
        }
      },
    },
  ] as const;
}

export async function vitepressPreviewPlugin(md: MarkdownIt, options?: DemoContainerOptions) {
  const resolvedOptions = resolveOptions(options);
  md.use(...await createDemoContainer(md, resolvedOptions)).use(md => useDemoImport(md, resolvedOptions));
}
