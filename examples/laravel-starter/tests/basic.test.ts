import OpenAPISchemaValidator from 'openapi-schema-validator';
import { expect, test } from 'bun:test';
import { openapi } from '../src/openapi';

const validator = new OpenAPISchemaValidator({
	version: 3,
});

test('parses openapi validator', () => {
	const res = validator.validate(JSON.parse(JSON.stringify(openapi)));
	console.dir({ res }, { depth: null });
	expect(res.errors.length).toBe(0);
});
