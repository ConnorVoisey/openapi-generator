import { type Openapi, serve } from '~/index';
import { schemas } from './schemas';
import { tags } from './tags';
import { paths } from './paths';

const url = 'https://api.laravel-svelte-template.local';
const openapi: Openapi = {
	openapi: '3.0.2',
	info: {
		title: 'Testing doc',
		description: 'This is a testing doc',
		version: '0.0.1',
	},
	tags, // tags are managed in './tags.ts'
	paths, // paths are managed in './paths.ts'
	servers: [{ url }],
	components: {
		schemas, // schemas are managed in './schemas.ts'
	},
};

serve({
	watchDir: import.meta.dir,
	writePath: './openapi.json',
	port: 8000,
	openapi,
});
