import { unlink } from 'fs/promises';
import { throwOperationFailed } from '../validation.js';
import { isExists } from './access.js';

export const remove = async (fileToRemove) => {
    try {
        const isFileToRemoveExists = await isExists(fileToRemove);

        if (!isFileToRemoveExists) {
            throwOperationFailed();
        }

        await unlink(fileToRemove);
        console.log(`File ${fileToRemove} was removed`);

    } catch (err) {
        console.log(err.message);
    }
};
