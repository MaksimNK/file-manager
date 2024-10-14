import { readCLI } from "./utils/cli.js";
import process from 'node:process';

const getUsername = () => {
    const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
    if (usernameArg) {
        return usernameArg.split('=')[1];
    } else {
        throw new Error('no username');
    }
};

const username = getUsername();
console.log(`Welcome to the File Manager, ${username}!`);

readCLI();
