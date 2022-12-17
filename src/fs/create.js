import { writeFile } from 'fs/promises';
import { FAILED_MSG } from './constants.js';
import { isExists } from './helpers.js';

export const create = async (fileName) => {
    try {
        const isfileExists = await isExists(fileName);
        if (isfileExists) {
            throw new Error(FAILED_MSG);
        }

        await writeFile(fileName, '', 'utf-8');
        console.log('The file has been created!');
    } catch (err) {
        console.log(err.message);
    }
};
