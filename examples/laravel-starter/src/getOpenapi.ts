import { openapi } from './openapi';
import { writeOpenapi } from '~/index';

const filePath = './openapi.json';
writeOpenapi(filePath, openapi);
console.info(`Written openapi json file to: ${filePath}`);
