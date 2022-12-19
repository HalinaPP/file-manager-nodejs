import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createBrotliCompress } from 'zlib';
import path from 'path';

export const compress = async (fileToCompress, archive) => {
    try {
        const fileToCompress2 = path.join(process.cwd(), 'uncompressed2.txt');
        const streamToCompress = createReadStream(fileToCompress2);
        const archiveFileName = path.join(process.cwd(), 'compressed.txt.gz');
        const archiveStream = createWriteStream(archiveFileName);
        const brotli = createBrotliCompress();
        // streamToCompress.pipe(brotli).pipe(archiveStream);

        await pipeline(streamToCompress, brotli, archiveStream, (err) => {
            if (err) {
                console.log('Can not archive file:', err);
            } else {
                console.log(`File ${fileToCompress} was compressed`);
            }
        });

    } catch (err) {
        console.log(err);
    }
};
