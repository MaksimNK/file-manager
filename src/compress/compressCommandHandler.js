import { compress, decompress } from "./compressFunctions.js";

export const handleCompressCommand = async (command, args) => {
    switch(command) {
        case 'compress':
            await compress(args[0]);
            console.log('Compression complete.');
            break;
        case 'decompress':
            await decompress(args[0]);
            console.log('Decompression complete.');
            break;
    }
}