import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { isExists, isDir } from './access.js';
import { throwInvalidInput, throwOperationFailed } from '../validation.js';

export const copy = async (source, destDir) => {
  try {
    const isSourceExists = await isExists(source);
    const isDestExists = await isExists(destDir);

    console.log();
    const destDirData = path.parse(destDir);

    if (!isSourceExists || !isDestExists) {
      throwOperationFailed();
    }

    if (!isDir(destDir)) {
      console.log('base=', destDirData.base)
      throwInvalidInput();
    }



    const { dir, base, name, ext } = path.parse(source);
    let destFileName = base;

    if (dir === destDir) {
      console.log('File name exists.');
      destFileName = `${name}-Copy${ext}`;
    }
    const dest = path.resolve(destDir, destFileName);


    const readableStream = createReadStream(source);
    const writableStream = createWriteStream(dest);

    readableStream.pipe(writableStream);

    console.log('File copied!');
  } catch (err) {
    console.log(err.message);
  }
};
