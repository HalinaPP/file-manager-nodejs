const { createHash } = await import('node:crypto');
import { createReadStream } from 'fs';
import { stdout } from 'process';
import { throwOperationFailed } from '../validation.js';
import { printCurrentDirectory } from '../helpers.js';
import { isExists } from '../fs-helpers.js';

export const calculateHash = async (fileName) => {
    try {
        const isFileNameExists = await isExists(fileName);

        if (!isFileNameExists) {
            throwOperationFailed();
        }

        const hash = createHash('sha256');
        const input = createReadStream(fileName);

        input.pipe(hash).setEncoding('hex').pipe(stdout);

        input.on('end', () => {
            console.log('\r\n');
            printCurrentDirectory();
        })
    } catch (error) {
        throwOperationFailed();
    }
};

