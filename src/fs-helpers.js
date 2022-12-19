import path from 'path';
import { access, stat } from 'fs/promises';
import { isEmpty } from './validation.js';

export const isExists = async (sourceName) => {
  let isSourceExists = false;

  try {
    await access(sourceName);
    isSourceExists = true;
  } catch (err) { }

  return isSourceExists;
};

export const isDir = async (sourceName) => {
  const stats = await stat(sourceName);
  return stats.isDirectory();
};

export const isNotFilename = (filename) => {
  const filenameSymb = filename.split('');

  const forbidenSymbols = ['\\', '/', ':'];
  const isFilenameHaveForbidden = forbidenSymbols.some((symbol) =>
    filenameSymb.includes(symbol)
  );

  return isFilenameHaveForbidden;
};

export const getAbsolutePath = (pathValue) => {
  const currDir = process.cwd();

  if (isEmpty(pathValue)) {
    return currDir;
  }

  const endedPath =
    pathValue.endsWith(':')
      ? pathValue + '\\'
      : pathValue;

  return path.isAbsolute(endedPath) ? endedPath : path.join(currDir, endedPath);
};