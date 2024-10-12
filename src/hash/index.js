import path from 'path';
import crypto from 'crypto'
import { createReadStream } from 'fs';

export const handleHashCommand = async (command) => {

    const [cmd, args, arg2] = command.split(' ');

    const currentDir = process.cwd();

    try {
        switch(cmd) {
            case 'hash':
            const filePath = path.join(currentDir, args);
            const hash = crypto.createHash('sha256');
            const readStream = createReadStream(filePath);
            readStream.on('data', (data) => {
                hash.update(data);
            })
            readStream.on('end', () => {
                console.log(hash.digest('hex'));
            })
            
        }
    } catch (error) {
        throw error;   
    }
}


/*
Hash calculation

    Calculate hash for file and print it into console

hash path_to_file

Compress and decompress operations

    Compress file (using Brotli algorithm, should be done using Streams API)

compress path_to_file path_to_destination

    Decompress file (using Brotli algorithm, should be done using Streams API)

decompress path_to_file path_to_destination

NB! After decompressing of previously compressed file result should not differ with originally compressed file

*/

