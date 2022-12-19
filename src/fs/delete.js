import { unlink } from 'fs/promises';
import { FAILED_MSG } from './constants.js';
import { isExists } from './access.js';

export const remove = async (fileToRemove) => {
    try {
        const isFileToRemoveExists = await isExists(fileToRemove);

        if (!isFileToRemoveExists) {
            throw new Error(FAILED_MSG);
        }

        await unlink(fileToRemove);
        console.log(`File ${fileToRemove} was removed`);

    } catch (err) {
        console.log(err.message);
    }
};
