import { server as serve } from './package/server';
import { Tag } from './package/types';
import { schemas } from './schema';
import { paths } from './paths';

const todoTag: Tag = {
	name: 'Todo',
	description: 'Todo module',
};
const url = 'http://localhost:3000';

serve({
	watchDir: import.meta.dir,
	port: 3000,
	openapi: {
		openapi: '3.0.2',
		info: {
			title: 'Testing doc',
			description: 'This is a testing doc',
			version: '0.0.1',
		},
		tags: [todoTag],
		paths,
		servers: [{ url }],
		components: {
			schemas,
		},
	},
});
