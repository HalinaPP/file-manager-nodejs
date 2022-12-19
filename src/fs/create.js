import { writeFile } from 'fs/promises';
import { throwOperationFailed } from '../validation.js';
import { isExists } from './access.js';

export const create = async (fileName) => {
    try {
        const isfileExists = await isExists(fileName);
        if (isfileExists) {
            throwOperationFailed();
        }

        await writeFile(fileName, '', 'utf-8');
        console.log('The file has been created!');
    } catch (err) {
        console.log(err.message);
    }
};
