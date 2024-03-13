import type { Openapi } from './package/types';
import { schemas } from './schemas';
import { paths } from './paths';
import { tags } from './tags';

const url = 'https://api.laravel-svelte-template.local';

export const openapi: Openapi = {
	openapi: '3.0.2',
	info: {
		title: 'Testing doc',
		description: 'This is a testing doc',
		version: '0.0.1',
	},
	tags, // tags are managed in 'src/tags.ts'
	paths, // paths are managed in 'src/paths.ts'
	servers: [{ url }],
	components: {
		schemas, // schemas are managed in 'src/schemas.ts'
	},
};
