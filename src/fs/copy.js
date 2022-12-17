import { copyFile } from 'fs/promises';
import { FAILED_MSG } from './constants.js';
import { isExists } from './helpers.js';

export const copy = async (source, dest) => {
    try {
        const isSourceExists = await isExists(source);
        const isDestExists = await isExists(dest);

        if (!isSourceExists || isDestExists) {
            throw new Error(FAILED_MSG);
        }

        copyFile(source, dest);
        console.log('File copied!')
    } catch (err) {
        console.log(err.message);
    }
};
