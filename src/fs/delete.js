import { unlink } from 'fs/promises';
import { throwOperationFailed } from '../validation.js';
import { isExists } from '../fs-helpers.js';

export const remove = async (fileToRemove) => {
    const isFileToRemoveExists = await isExists(fileToRemove);

    if (!isFileToRemoveExists) {
        throwOperationFailed();
    }

    await unlink(fileToRemove);
    console.log(`File ${fileToRemove} was removed`);
};
