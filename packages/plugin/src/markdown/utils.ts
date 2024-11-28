import fs from 'node:fs';
import path from 'node:path';

export function readFile(path: string) {
  const fileContent = fs.readFileSync(path, 'utf8');
  if (!fileContent) throw new Error(`Incorrect source file: ${path}`);
  return fileContent;
};

export function isFile(path: string) {
  const stats = fs.statSync(path);
  return stats.isFile();
}

export function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    }
    else {
      arrayOfFiles.push(filePath);
    }
  }

  return arrayOfFiles;
}

export function toCamelCase(key: string) {
  return key.replaceAll(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
};
export function toPascalCase(key: string) {
  const name = toCamelCase(key);
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};

const normalizePathRegExp = new RegExp(`\\${path.win32.sep}`, 'g');
export function normalizePath(filename: string) {
  return filename.replace(normalizePathRegExp, path.posix.sep);
};

const scriptSetupReg = /<\s*script[^>]*\bsetup\b[^>]*/;
export function injectImport(mdFile: any, pkg: string, varname?: string) {
  const scriptSetupIndex: number = mdFile.sfcBlocks.scripts.findIndex((script: any) => scriptSetupReg.test(script.tagOpen));
  const importCode = varname ? `import ${varname} from "${pkg}";` : `import "${pkg}";`;
  function insertImportToTop(scriptContext: any) {
    const scriptSetup = { ...scriptContext };
    const codes = scriptSetup.content.split('\n');
    codes.splice(1, 0, importCode);
    scriptSetup.content = codes.join('\n');
    scriptSetup.contentStripped = codes.slice(1, -1).join('\n');
    return scriptSetup;
  }
  // all ready have setup script, append import code into script
  if (scriptSetupIndex !== -1) {
    // already same import
    const scriptContext = mdFile.sfcBlocks.scripts[scriptSetupIndex];
    mdFile.sfcBlocks.scripts[scriptSetupIndex] = scriptContext.content.includes(pkg) && (!varname || scriptContext.content.includes(varname)) ? scriptContext : insertImportToTop(mdFile.sfcBlocks.scripts[scriptSetupIndex]);
  }
  else {
    mdFile.sfcBlocks.scripts.push({
      type: 'script',
      tagClose: '</script>',
      tagOpen: '<script setup lang=\'ts\'>',
      content: `<script setup lang='ts'>\n${importCode}\n</script>`,
      contentStripped: importCode,
    });
  }
}
