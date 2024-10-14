import { readFile, renameFile, moveFile, removeFile, copyFile, createFile } from "./fsFunctions.js";

export const handleFsCommand = async (command, args) => {
    let result;

    switch (command) {
        case 'cat':
            result = await readFile(args[0]);
            console.log(result); 
            break;
        case 'rn':
            await renameFile(args[0], args[1]);
            console.log(`File renamed from ${args[0]} to ${args[1]}`);
            break;
        case 'mv':
            await moveFile(args[0], args[1]);
            console.log(`File moved from ${args[0]} to ${args[1]}`);
            break;
        case 'rm':
            await removeFile(args[0]);
            console.log(`File ${args[0]} removed successfully`);
            break;
        case 'cp':
            await copyFile(args[0], args[1]);
            console.log(`File copied from ${args[0]} to ${args[1]}`);
            break;
        case 'add':
            await createFile(args[0]);
            console.log(`File ${args[0]} created successfully`);
            break;
        default:
            console.log('Invalid command');
            return;
    }
};
