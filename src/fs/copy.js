import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { isExists, isDir } from './access.js';
import {
  isEmpty,
  throwInvalidInput,
  throwOperationFailed,
  throwFileExists
} from '../validation.js';
import { getAbsolutePath } from '../helpers.js';

const getDestName = async (sourceName, destDir) => {
  const { dir, base, name, ext } = path.parse(sourceName);
  const destFileName = base;

  if (dir === destDir) {
    throwFileExists();
  }
  const dest = path.resolve(destDir, destFileName);

  if (await isExists(dest)) {
    throwFileExists();
  }

  return dest;
};

export const copy = async (source, destDir) => {
  try {
    if (isEmpty(destDir)) {
      throwInvalidInput();
    }

    const destDirPath = getAbsolutePath(destDir);
    const isDestExists = await isExists(destDirPath);
    const isSourceExists = await isExists(source);

    if (!isSourceExists || !isDestExists) {
      throwOperationFailed();
    }

    const isDestDir = await isDir(destDirPath);

    if (!isDestDir) {
      throwInvalidInput();
    }

    const dest = await getDestName(source, destDirPath);

    const readableStream = createReadStream(source);
    const writableStream = createWriteStream(dest);

    await readableStream.pipe(writableStream);

    console.log(`File copied! From ${source} to ${dest}`);
  } catch (err) {
    console.log(err.message);
  }
};
