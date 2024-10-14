import crypto from 'crypto'
import { getPath } from "../utils/pathService.js";
import { createReadStream } from 'fs';

export const hashFile = async(fileName) => {

    const filePath = getPath(fileName);
    const hash = crypto.createHash('sha256');
    const readStream = createReadStream(filePath);
    readStream.on('data', (data) => {
        hash.update(data);
    })      
    readStream.on('end', () => {
        console.log(hash.digest('hex')  );
     })

}