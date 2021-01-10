import * as dotenv from 'dotenv';
dotenv.config(); // call dotenv.config before importing other modules
import * as path from 'path';
import * as fileSystem from 'fs';
import { connectionOptions } from './ConnectionOptions';


const content = JSON.stringify({ ...connectionOptions }, undefined, 2);
const filePath = path.join(process.cwd(), 'ormconfig.json');

fileSystem.writeFile(filePath, content, (error) => {
    if (error) {
        console.error('Failed to generate the ormconfig.json', error);
        process.exit(1);
    } else {
        process.exit(0);
    }
});
