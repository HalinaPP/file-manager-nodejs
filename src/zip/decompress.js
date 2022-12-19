import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createBrotliDecompress } from 'zlib';
import path from 'path';
import { printCurrentDirectory } from '../helpers.js';
import { isExists } from '../fs-helpers.js';
import {
    validateDestDir,
    throwOperationFailed
} from '../validation.js';
import { getDestName } from './parse-filename.js';

export const decompress = async (fileToDecompress, destDir) => {

    await validateDestDir(destDir);

    const isSourceExists = await isExists(fileToDecompress);

    if (!isSourceExists) {
        throwOperationFailed();
    }

    const streamToDecompress = createReadStream(fileToDecompress);

    const { name: destFileName } = path.parse(fileToDecompress);
    const decompressedFile = await getDestName(destFileName, destDir);
    const decompressedStream = createWriteStream(decompressedFile);

    const brotli = createBrotliDecompress();

    pipeline(streamToDecompress, brotli, decompressedStream, (err) => {
        if (err) {
            console.log('Can not unzip file:', err);
        } else {
            console.log(`File ${fileToDecompress} was uncompressed`);
        }

        printCurrentDirectory();
    });
};
