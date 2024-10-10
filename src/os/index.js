import fs from 'fs';
import path from 'path';
import os from 'os';

// Operating system info 

export const handleOsCommand = (command) => {
    const [cmd, args] = command.split(' ');
    console.log(cmd);

    console.log(args);

    switch(args) {
        // os --EOL
        //Get EOL (default system End-Of-Line) and print it to console
        case '--EOL':
            console.log((os.EOL).toString());
            break;

        // os --cpus
        // Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
        case '--cpus':
            console.log(os.cpus());
            break;

        // os --homedir
        // Get home directory and print it to console    
        case '--homedir':
            console.log(os.homedir());
            break;

        //    os --username
        //    Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console
        case '--username':
            console.log(os.userInfo().username);
            break;

        // os   --architecture 
        //    Get CPU architecture for which Node.js binary has compiled and print it to console
        case '--architecture':
            console.log(os.arch());
            break;

        default: console.log('os: command not found ' + args);        
    }

}