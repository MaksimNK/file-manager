import { getCurrentDirectory, setCurrentDirectory } from '../utils/pathService.js';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

export const changeDirectory = (pathToDirectory) => {
    const newPath = path.isAbsolute(pathToDirectory)
        ? pathToDirectory
        : path.join(getCurrentDirectory(), pathToDirectory);

    try {
        process.chdir(newPath);
        setCurrentDirectory(newPath);
        console.log(`Changed directory to: ${newPath}`);
    } catch (error) {
        console.error(`Error changing directory: ${error.message}`);
    }
};

export const presentWorkingDirectory = () => {
    return getCurrentDirectory();
};

export const listFiles = async () => {
    const pathToFolder = getCurrentDirectory();
    const result = [];

    try {
        const content = await readdir(pathToFolder);
        const currentDirectory = getCurrentDirectory();

        for (let item of content) {
            const pathToItem = path.join(currentDirectory, item);
            const stats = await stat(pathToItem);
            result.push({
                Name: item,
                Type: stats.isDirectory() ? 'directory' : 'file',
            });
        }

        result.sort((a, b) => {
            if (a.Type === b.Type) {
                return a.Name.localeCompare(b.Name);
            }
            return a.Type === 'directory' ? -1 : 1;
        });

        return result;
    } catch (error) {
        console.error(`Error listing files: ${error.message}`);
        return [];
    }
};

export const goUpDirectory = () => {
    const currentPath = getCurrentDirectory();
    const parentPath = path.dirname(currentPath);

    if (currentPath !== parentPath) {
        changeDirectory(parentPath);
    } else {
        console.log('You are already at the root directory.');
    }
};

