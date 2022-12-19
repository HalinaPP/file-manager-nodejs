import { createReadStream } from 'fs';
import { stdout } from 'process';
import { throwOperationFailed } from '../validation.js';
import { isExists } from '../fs-helpers.js';
import { printCurrentDirectory } from '../helpers.js';

export const read = async (fileName) => {
  const isFileToReadExists = await isExists(fileName);

  if (!isFileToReadExists) {
    throwOperationFailed();
  }

  const input = createReadStream(fileName);
  input.pipe(stdout);

  input.on('end', () => {
    console.log('\r\n');
    printCurrentDirectory();
  });
};
