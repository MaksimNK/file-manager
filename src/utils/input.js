import readline from 'readline';
import {handleOsCommand} from '../os/index.js';
import { handleFsCommand } from '../fs/index.js';

export const readCLI = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const execute = () => {
        rl.question('', async (command) => {
            //handleOsCommand(command);
            handleFsCommand(command);
            execute();
        })
    }

    execute();
} 