import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import os from 'os';
import fs from 'node:fs/promises'
import { error } from 'console';


export const handleFsCommand = async (command) => {

    const [cmd, args, arg2] = command.split(' ');
    console.log(cmd);

    const currentDir = process.cwd();
    console.log(currentDir);
    switch(cmd) {
        case 'cat':
            const filePath = path.join(currentDir, args);
            const rs = await createReadStream(filePath);
            const result = [];
            rs.on('data', (data) => {
                result.push(data.toString());
            });
            rs.on('error', function (error) {
                console.log(`error: ${error.message}`);
            })
            rs.on('end', (data) => {
                console.log(result.join('\n'));
            })

            break;
        
        case 'add':
            const filePathAdd = path.join(currentDir, args);
            try {
                await fs.writeFile(filePathAdd, '');                 
            } catch (error) {
                throw error;
            }
            break;
        case 'rn':
            const FileName = path.join(currentDir, args);
            const newFileName = path.join(currentDir, arg2);
            await fs.rename(FileName, newFileName, () => {
                console.log("\nFile Renamed!\n");
            });
            break;
        case 'cp':
            const currentFilePath = path.join(currentDir, args);
            const destinationFilePath = path.join(currentDir, arg2);
            const readStream = createReadStream(currentFilePath);
            const writeStream = createWriteStream(destinationFilePath);

            readStream.on('error', (err) => {
                console.error(`Error reading file: ${err.message}`);
            });

            writeStream.on('error', (err) => {
                console.error(`Error writing file: ${err.message}`);
            });


            readStream.pipe(writeStream);

            writeStream.on('finish', () => {
                console.log(`${currentFilePath} successful copy to ${destinationFilePath}`);
            })
            break;

        case 'mv':
            const currentPath= path.join(currentDir, args);

            //must have the same name like org
            const destinationPath = path.join(currentDir, arg2);


            const readStreamMV = createReadStream(currentPath);
            const writeStreamMV = createWriteStream(destinationPath);

            readStreamMV.on('error', (err) => {
                console.error(`Error reading file: ${err.message}`);
            });

            writeStreamMV.on('error', (err) => {
                console.error(`Error writing file: ${err.message}`);
            });


            readStreamMV.pipe(writeStreamMV);

            writeStreamMV.on('finish', () => {
                fs.unlink(currentPath, (error) => {
                    if(error) {
                        //add logic to remove new file
                        throw new Error('Error with mv');
                    }
                    
                    console.log(`${currentPath} successful move to ${destinationPath}`);
                })
            })
            break;
        case 'rm':
            const currentPathToDelete = path.join(currentDir, args);
            await fs.unlink(currentPathToDelete);
            break;

        default: console.log('Undefined arg');        
    }

}