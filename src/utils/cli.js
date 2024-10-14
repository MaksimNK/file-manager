import readline from 'readline';
import {handleOsCommand} from '../os/osCommandHandler.js';
import { handleFsCommand } from '../fs/fsCommandHandler.js';
import {COMMANDS_FS, COMMANDS_OS, COMMANDS_NAVIGATE, COMMANDS_HASH, COMMANDS_COMPRESS} from '../constants/commands.js';
import { getCurrentDirectory, getPath } from './pathService.js';
import { handleHashCommand } from '../hash/hashCommandHandler.js';
import { handleNavigationCommand } from '../navigation/navigationCommandHandler.js';
import { handleCompressCommand } from '../compress/compressCommandHandler.js';

export const readCLI = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on('line', async (input) => {        
        const [command, ...args] = input.trim().split(' ');
        const upperCommand = command.toUpperCase();
        

        if (upperCommand === 'EXIT') {
            console.log('Exiting the File Manager. Goodbye!');
            process.exit(0);
        }

        switch (true) {
            case COMMANDS_FS.hasOwnProperty(upperCommand):
                await handleFsCommand(command, args);
                break;
            case COMMANDS_OS.hasOwnProperty(upperCommand):
                await handleOsCommand(args[0]);
                break;
            case COMMANDS_NAVIGATE.hasOwnProperty(upperCommand):
                await handleNavigationCommand(command, args);
                break;
            case COMMANDS_HASH.hasOwnProperty(upperCommand):
                await handleHashCommand(command, args);
                break;
            case COMMANDS_COMPRESS.hasOwnProperty(upperCommand):
                await handleCompressCommand(command, args);
                break;
            default:
                console.log('Invalid Command');
                break;
            }
        console.log(`You are currently in ${getCurrentDirectory()}`);
    });


          

    
} 