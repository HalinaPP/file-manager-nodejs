import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createBrotliCompress } from 'zlib';
import path from 'path';
import { printCurrentDirectory } from '../helpers.js';
import { isExists } from '../fs-helpers.js';
import { throwOperationFailed, validateDestDir } from '../validation.js';
import { getDestName } from './parse-filename.js';

export const compress = async (fileToCompress, destDir) => {
    await validateDestDir(destDir);

    const isSourceExists = await isExists(fileToCompress);

    if (!isSourceExists) {
        throwOperationFailed();
    }

    const streamToCompress = createReadStream(fileToCompress);

    const { base: destFileName } = path.parse(fileToCompress);
    const compressedFileName = await getDestName(destFileName, destDir, '.br');
    const compressedStream = createWriteStream(compressedFileName);

    const brotli = createBrotliCompress();

    pipeline(streamToCompress, brotli, compressedStream, (err) => {
        if (err) {
            console.log('Can not archive file:', err);
        } else {
            console.log(`File ${fileToCompress} was compressed`);
        }

        printCurrentDirectory();
    });
};
