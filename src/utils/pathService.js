import path from 'node:path';
import {HOME_DIR, ROOT_DIR} from '../constants/paths.js';

let currentDirectory = HOME_DIR;

export const getPath = (pathToFile) => {

    if(path.isAbsolute(pathToFile)) {
        return path.join(ROOT_DIR, pathToFile);
    } else {
        return path.join(currentDirectory, pathToFile);
    }
}

export const getCurrentDirectory = () => {
    return currentDirectory;
}

export const setCurrentDirectory = (newFile) => {
    currentDirectory = newFile;
}
