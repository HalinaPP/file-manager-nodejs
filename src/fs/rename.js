import fs from 'fs/promises';
import path from 'path';
import { throwOperationFailed, throwInvalidInput } from '../validation.js';
import { isExists, isNotFilename } from './access.js';

export const rename = async (source, newFilename) => {
    try {
        if (isNotFilename(newFilename)) {
            throwInvalidInput();
        }

        const isSourceExists = await isExists(source);

        if (!isSourceExists) {
            throwOperationFailed();
        }

        const { dir } = path.parse(source);
        const dest = path.resolve(dir, newFilename);

        const isDestExists = await isExists(dest);

        if (isDestExists) {
            throwOperationFailed();
        }

        await fs.rename(source, dest);
        console.log(`File ${source} was renamed to ${dest}`);
    } catch (err) {
        console.log(err.message);
    }
};
