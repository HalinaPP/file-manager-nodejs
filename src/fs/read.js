import { createReadStream } from 'fs';
import { pipeline, Writable } from 'stream';
import { stdin, stdout } from 'process';
import { FAILED_MSG } from './constants.js';
import { isExists } from './access.js';
import { printCurrentDirectory } from '../helpers.js';

export const read = async (fileName) => {
  try {
    const isFileToReadExists = await isExists(fileName);

    if (!isFileToReadExists) {
      throw new Error(FAILED_MSG);
    }

    const input = createReadStream(fileName);
    await input.pipe(stdout);

    input.on('end', () => {
      console.log('\rn');
      printCurrentDirectory();
    });
  } catch (err) {
    console.log(err.message);
  }
};
