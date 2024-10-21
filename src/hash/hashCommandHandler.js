import { hashFile } from './hashFunctions.js';

export const handleHashCommand = async (command, args) => {

    switch(command) {
        case 'hash':
            hashFile(args[0]);
            break;
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

