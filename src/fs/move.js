import { throwOperationFailed } from '../validation.js';
import { isExists } from './access.js';
import { copy, remove } from './index.js';

export const move = async (source, dest) => {
  try {
    const isSourceExists = await isExists(source);
    const isDestExists = await isExists(dest);

    if (!isSourceExists || isDestExists) {
      throwOperationFailed();
    }

    await copy(source, dest);
    await remove(source);

    console.log('File moved!')
  } catch (err) {
    console.log(err.message);
  }
};
