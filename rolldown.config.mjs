import * as path from 'node:path';
import { defineConfig } from 'rolldown';
import { glob } from 'glob';
import escapeRegExp from 'lodash.escaperegexp';

/**
 * ビルド対象ファイルの抽出パターン
 */
const entryPointGlobPattern = './templates/**/*.{ts,js}';

/**
 * ビルド対象から除外するパターン
 */
const ignoreFilePrefix = '_';
const ignoreFileSuffix = '_bk';
const ignoreFileNames = [];
const ignoreDirPrefix = '_';
const ignoreDirSuffix = '_bk';
const ignoreDirNames = [];

/**
 * 除外パターン設定を定義
 */
const globOption = {
  ignore: {
    ignored: (entryPath) => {
      const fileName = path.basename(entryPath.name, path.extname(entryPath.name));
      const prefixCheck = ignoreFilePrefix
        ? RegExp('^' + escapeRegExp(ignoreFilePrefix)).test(fileName)
        : false;
      const suffixCheck = ignoreFileSuffix
        ? RegExp(escapeRegExp(ignoreFileSuffix) + '$').test(fileName)
        : false;
      return (
        prefixCheck || suffixCheck || (Array.isArray(ignoreFileNames) && ignoreFileNames.includes(fileName))
      );
    },
    childrenIgnored: (entryPath) => {
      const dirName = entryPath.name;
      const prefixCheck = ignoreDirPrefix
        ? RegExp('^' + escapeRegExp(ignoreDirPrefix)).test(dirName)
        : false;
      const suffixCheck = ignoreDirSuffix
        ? RegExp(escapeRegExp(ignoreDirSuffix) + '$').test(dirName)
        : false;
      return prefixCheck || suffixCheck || (Array.isArray(ignoreDirNames) && ignoreDirNames.includes(dirName));
    },
  },
};
/**
 * ビルド対象ファイルを抽出
 */
const entryPointFiles = glob.sync(entryPointGlobPattern, globOption);

/**
 * 抽出したビルド対象ファイルを元に、
 * 出力先ファイル名をキー、ビルド対象ファイルを値とした
 * Rolldownのエントリポイントデータを生成
 */
const entryPoints = {};
entryPointFiles.forEach((entryPointFile) => {
  const targetFile = path.relative('./templates', entryPointFile);
  const key = path.join(
    path.dirname(targetFile),
    path.basename(targetFile, path.extname(targetFile)),
  );
  entryPoints[key] = entryPointFile;
});

/**
 * Rolldownの設定
 */
export default defineConfig({
  input: entryPoints,
  output: {
    dir: 'webroot/js',
    format: 'esm',
    globals: {
      jquery: '$'
    },
    chunkFileNames: 'lib/[name].mjs',
    entryFileNames: '[name].js',
  },
});
