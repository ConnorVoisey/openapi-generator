import OpenAPISchemaValidator from 'openapi-schema-validator';
import { describe, expect, test } from 'bun:test';
import { Openapi } from '../package/types';
import { tags } from '../tags';
import { paths } from '../paths';
import { schemas } from '../schemas';

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
const validator = new OpenAPISchemaValidator({
	version: 3,
});
describe('basic', () => {
	test('simple', () => {
        //@ts-ignore
		const res = validator.validate(openapi);
		console.dir({ res }, { depth: null });
		expect(res.errors.length).toBe(0);
	});
});
