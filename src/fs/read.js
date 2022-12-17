import { readFile } from 'fs/promises';
import { FAILED_MSG } from './constants.js';
import { isExists } from './helpers.js';

export const read = async (fileName) => {
    try {
        const isFileToReadExists = await isExists(fileName);

        if (!isFileToReadExists) {
            throw new Error(FAILED_MSG);
        }

        const fileData = await readFile(fileName, { encoding: 'utf8' });
        console.log(fileData);
    } catch (err) {
        console.log(err.message);
    }
};
