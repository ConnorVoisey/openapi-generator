import { openapi } from './openapi';
import { writeOpenapi } from './package/server';

const filePath = './openapi.json';
writeOpenapi(filePath, openapi);
console.info(`Written openapi json file to: ${filePath}`);
