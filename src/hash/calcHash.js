const { createHash } = await import('node:crypto');
import { createReadStream } from 'fs';
import { stdout } from 'process';

export const calculateHash = async (fileName) => {

    const hash = createHash('sha256');
    const input = createReadStream(fileName);
    input.pipe(hash).setEncoding('hex').pipe(stdout);
    input.on('end', () => { console.log('\r\nend hash'); })
};

