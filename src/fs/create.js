import { writeFile } from 'fs/promises';
import { throwOperationFailed, throwInvalidInput } from '../validation.js';
import { isNotFilename, isExists } from './access.js';
import { getAbsolutePath } from '../helpers.js';

export const create = async (fileName) => {
    try {
        if (isNotFilename(fileName)) {
            throwInvalidInput();
        }

        const source = getAbsolutePath(fileName ?? '');
        const isfileExists = await isExists(source);

        if (isfileExists) {
            throwOperationFailed();
        }

        await writeFile(source, '', 'utf-8');
        console.log('The file has been created!');
    } catch (err) {
        console.log(err.message);
    }
};
