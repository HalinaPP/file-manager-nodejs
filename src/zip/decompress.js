import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createBrotliDecompress } from 'zlib';
import path from 'path';


export const decompress = async (fileToDecompress, decompressedFile) => {
    const archiveFileName = path.join(process.cwd(), 'compressed.txt.gz');
    const streamToDecompress = createReadStream(archiveFileName);

    const decompressedFile2 = path.join(process.cwd(), 'uncompressed.txt');
    const decompressedStream = createWriteStream(decompressedFile2);
    const brotli = createBrotliDecompress();

    pipeline(streamToDecompress, brotli, decompressedStream, (err) => {
        if (err) {
            console.log('Can not unzip file:', err);
        } else {
            console.log(`File ${fileToDecompress} was uncompressed`);
        }
    });
};
