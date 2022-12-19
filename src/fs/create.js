import { writeFile } from 'fs/promises';
import { throwOperationFailed, throwInvalidInput } from '../validation.js';
import { isNotFilename, isExists, getAbsolutePath } from '../fs-helpers.js';
import { printCurrentDirectory } from '../helpers.js';

export const create = async (fileName) => {
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
    printCurrentDirectory();
};
