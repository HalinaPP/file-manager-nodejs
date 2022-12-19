import { copy, remove } from './index.js';

export const move = async (source, destDir) => {
  try {
    await copy(source, destDir);
    await remove(source);

    console.log('File moved!')
  } catch (err) {
    console.log(err.message);
  }
};
