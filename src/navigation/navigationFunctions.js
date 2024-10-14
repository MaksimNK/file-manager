import { getCurrentDirectory, setCurrentDirectory } from '../utils/pathService.js';
import {readdir, stat} from 'node:fs/promises';
import path from 'node:path';

export const changeDirectory = (pathToDirectory) => {
    const newPath = path.isAbsolute(pathToDirectory)
    ? pathToDirectory
    : path.join(getCurrentDirectory(), pathToDirectory);
    try {
        process.chdir(newPath);
        setCurrentDirectory(newPath);        
    } catch (error) {
        console.error(`Error ${error.message}`);
    }
}
export const presentWorkingDirectory = () => {
    return getCurrentDirectory();
}

export const listFiles = async () => {
    const pathToFolder = getCurrentDirectory();
    const result = [];
    const content = await readdir(pathToFolder);
    const currentDirectory = getCurrentDirectory();

    for(let item of content) {
        const pathToItem = path.join(currentDirectory, item)
        const stats = await stat(pathToItem);
        if(stats.isDirectory()) {
            result.push({
                Name: item,
                Type: 'directory',
            });
        } else {
            result.push({
                Name: item,
                Type: 'file',
            });
        }
    }
    result.sort((a, b) => {
        if (a.Type === b.Type) {
            return a.Name.localeCompare(b.Name);
        }
        return a.Type === 'directory' ? -1 : 1;
    });

    return result;
} 