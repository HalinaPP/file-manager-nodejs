import { FAILED_MSG } from './constants.js';
import { isExists } from './helpers.js';
import { copy, remove } from './index.js';

export const move = async (source, dest) => {
  try {
    const isSourceExists = await isExists(source);
    const isDestExists = await isExists(dest);

    if (!isSourceExists || isDestExists) {
      throw new Error(FAILED_MSG);
    }

    await copy(source, dest);
    await remove(source);

    console.log('File moved!')
  } catch (err) {
    console.log(err.message);
  }
};
