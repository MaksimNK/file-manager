import fs from 'fs';
import path from 'path';
import os from 'os';

// Operating system info 

// os --EOL
//Get EOL (default system End-Of-Line) and print it to console
export const getEOL = () => {
    return os.EOL;   
}

// os --cpus
// Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
export const getCpus = () => {
    return os.cpus();
}

// os --homedir
// Get home directory and print it to console   
export const getHomeDir = () => {
    return os.homedir();
}

//  os --username
//  Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console
export const getUsername = () => {
    return os.userInfo().username;
}
// os   --architecture 
//  Get CPU architecture for which Node.js binary has compiled and print it to console
export const getArchitecture = () => {
    return os.arch();
}