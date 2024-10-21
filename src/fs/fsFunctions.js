import { createReadStream, createWriteStream } from 'fs';
import fs from 'node:fs/promises';
import { getPath } from '../utils/pathService.js';

export const readFile = async (fileName) => {
    const filePath = getPath(fileName);
    const rs = createReadStream(filePath);
    const result = [];

    return new Promise((resolve, reject) => {
        rs.on('data', (data) => {
            result.push(data.toString());
        });

        rs.on('error', (error) => {
            reject(`Error: ${error.message}`);
        });

        rs.on('end', () => {
            resolve(result.join('\n'));
        });
    });
};

export const renameFile = async (currentFileName, newFileName) => {
    const currentFileNamePath = getPath(currentFileName);
    const newFileNamePath = getPath(newFileName);
    await fs.rename(currentFileNamePath, newFileNamePath);
};

export const moveFile = async (pathToFile, pathToNewDirectory) => {
    const currentFilePath = getPath(pathToFile);
    const destinationFilePath = getPath(pathToNewDirectory);

    const readStreamMV = createReadStream(currentFilePath);
    const writeStreamMV = createWriteStream(destinationFilePath);

    return new Promise((resolve, reject) => {
        readStreamMV.on('error', (err) => {
            reject(`Error reading file: ${err.message}`);
        });

        writeStreamMV.on('error', (err) => {
            reject(`Error writing file: ${err.message}`);
        });

        readStreamMV.pipe(writeStreamMV);

        writeStreamMV.on('finish', async () => {
            try {
                await fs.unlink(currentFilePath);
                resolve(`${currentFilePath} successfully moved to ${destinationFilePath}`);
            } catch (error) {
                reject(`Error removing original file: ${error.message}`);
            }
        });
    });
};

export const removeFile = async (pathToFile) => {
    const pathToDelete = getPath(pathToFile);
    await fs.unlink(pathToDelete);
};

export const copyFile = async (fileName, destinationFileName) => {
    const currentFilePath = getPath(fileName);
    const destinationFilePath = getPath(destinationFileName);

    const readStream = createReadStream(currentFilePath);
    const writeStream = createWriteStream(destinationFilePath);

    return new Promise((resolve, reject) => {
        readStream.on('error', (err) => {
            reject(`Error reading file: ${err.message}`);
        });

        writeStream.on('error', (err) => {
            reject(`Error writing file: ${err.message}`);
        });

        readStream.pipe(writeStream);

        writeStream.on('finish', () => {
            resolve(`${currentFilePath} successfully copied to ${destinationFilePath}`);
        });
    });
};

export const createFile = async (fileName) => {
    const filePath = getPath(fileName);
    try {
        await fs.writeFile(filePath, '');
    } catch (error) {
        throw error;
    }
};
