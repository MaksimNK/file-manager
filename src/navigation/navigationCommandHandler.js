import path from 'node:path';
import { changeDirectory, listFiles, presentWorkingDirectory } from './navigationFunctions.js';

export const handleNavigationCommand = (command, args) => {
    switch(command) {
        case 'cd':
            changeDirectory(args[0]);
            break;
        case 'pwd':
            console.log(presentWorkingDirectory());
            break;
        case 'ls':
            listFiles().then(files => {
                console.table(files);
            })
            break;
    }
}