
import fs from 'fs/promises';
import path from 'path';
import { FAILED_MSG } from './constants.js';
import { isExists } from './access.js';

export const rename = async (source, newFilename) => {
    try {
        const isSourceExists = await isExists(source);

        const {dir, base} = path.parse(source);
        const dest = path.resolve(dir,newFilename);

        const isDestExists = await isExists(dest);

        if (!isSourceExists || isDestExists) {
            throw new Error(FAILED_MSG);
        }

        await fs.rename(source, dest)
        console.log(`File ${source} was renamed to ${dest}`);

    } catch (err) {
        console.log(err.message);
    }
};
