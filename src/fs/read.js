import { createReadStream } from 'fs';
import { stdout } from 'process';
import { throwOperationFailed } from '../validation.js';
import { isExists } from './access.js';
import { printCurrentDirectory } from '../helpers.js';

export const read = async (fileName) => {
  try {
    const isFileToReadExists = await isExists(fileName);

    if (!isFileToReadExists) {
      throwOperationFailed();
    }

    const input = createReadStream(fileName);
    await input.pipe(stdout);

    input.on('end', () => {
      console.log('\r\n');
      printCurrentDirectory();
    });
  } catch (err) {
    console.log(err.message);
  }
};
