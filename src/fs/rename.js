
import fs from 'fs/promises';
import path from 'path';
import { throwOperationFailed } from '../validation.js';
import { isExists } from './access.js';

export const rename = async (source, newFilename) => {
    try {
        const isSourceExists = await isExists(source);

        const { dir, base } = path.parse(source);
        const dest = path.resolve(dir, newFilename);

        const isDestExists = await isExists(dest);

        if (!isSourceExists || isDestExists) {
            throwOperationFailed();
        }

        await fs.rename(source, dest)
        console.log(`File ${source} was renamed to ${dest}`);

    } catch (err) {
        console.log(err.message);
    }
};
