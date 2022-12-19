import path from 'path';
import { isExists } from '../fs-helpers.js';
import { throwFileExists } from '../validation.js';

export const getDestName = async (sourceName, destDir, destFileExt = '') => {
  const dest = path.resolve(destDir, `${sourceName}${destFileExt}`);

  if (await isExists(dest)) {
    throwFileExists();
  }

  return dest;
};