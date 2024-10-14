import { getArchitecture, getCpus, getEOL, getHomeDir, getUsername } from "./osFunctions.js"

export const handleOsCommand = (args) => {
    switch(args) {
        case '--EOL':
            console.log(JSON.stringify(getEOL()));
            break;
        case '--cpus':
            console.log(getCpus());
            break;
        case '--homedir':
            console.log(getHomeDir());
            break;
        case '--username':
            console.log(getUsername());
            break;
        case '--architecture':
            console.log(getArchitecture());
            break;
        default:
            console.log('Invalid OS command');
    }
}