import zlib from 'node:zlib';
import { getPath } from '../utils/pathService.js';
import { createReadStream, createWriteStream } from 'node:fs';


export const compress = async (fileName) => {
    const filePath = getPath(fileName);
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(`${filePath}.br`);

    const brotli = zlib.createBrotliCompress();

    readStream.pipe(brotli).pipe(writeStream);

    readStream.on('error', (error) => {
        console.error(`Error reading: ${error.message}`);
    });

    writeStream.on('error', (error) => {
        console.error(`Error writing: ${error.message}`);
    });
}

export const decompress = async (fileName) => {
    const filePath = getPath(fileName);
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(filePath.replace('.br', ''));

    const brotli = zlib.createBrotliDecompress();
    
    readStream.pipe(brotli).pipe(writeStream);

    readStream.on('error', (error) => {
        console.error(`Error reading: ${error.message}`);
    });

    writeStream.on('error', (error) => {
        console.error(`Error writing: ${error.message}`);
    });


};
