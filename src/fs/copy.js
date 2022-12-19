import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { ERROR_MESSAGE } from '../messages.js';
import { isExists, isDir } from './access.js';
import {isNotEmpty} from '../validation.js';

export const copy = async (source, destDir) => {
  try {
    const isSourceExists = await isExists(source);
    const isDestExists = await isExists(destDir);

    console.log();
    const destDirData = path.parse(destDir);

    if (!isSourceExists || !isDestExists) {
        throw new Error(ERROR_MESSAGE.operationFailed);
      }
      
    if(!isDir(destDir)){
        console.log('base=',destDirData.base)
        throw new Error(ERROR_MESSAGE.invalidInput);
    }
  
   

    const { dir, base, name, ext } = path.parse(source);
    let destFileName = base;

    if(dir===destDir) {
        console.log('File name exists.');
        destFileName =`${name}-Copy${ext}`; 
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
