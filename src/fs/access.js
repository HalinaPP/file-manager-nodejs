import { access, stat } from 'fs/promises';

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
