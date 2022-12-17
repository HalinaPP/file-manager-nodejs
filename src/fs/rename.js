
import fs from 'fs/promises';
import { FAILED_MSG } from './constants.js';
import { isExists } from './helpers.js';

export const rename = async (source, dest) => {
    try {
        const isSourceExists = await isExists(source);
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
