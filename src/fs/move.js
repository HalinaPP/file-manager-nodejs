import { copy, remove } from './index.js';
import { printCurrentDirectory } from '../helpers.js';

export const move = async (source, destDir) => {

  await copy(source, destDir);
  await remove(source);

  console.log('File moved!')
  printCurrentDirectory();
};
