import type { Property } from './fields';
import type { Schema, Schemas } from './types';

export type InternalSchema = {
	ref: string;
	schema: Schema;
	asResponse: (description?: string) => {
		description: string;
		content: {
			'application/json': {
				schema: { $ref: string };
			};
		};
	};
	asRequest: (description?: string) => {
		description: string;
		required: boolean;
		content: { 'application/json': { schema: { $ref: string } } };
	};
};

export const schemas: Schemas = {};

export const schema: (input: {
	key: string;
	properties: Record<string, Property>;
}) => InternalSchema = ({ key, properties }) => {
	const required: string[] = [];
	for (const fieldKey in properties) {
		const field = properties[fieldKey];
		if (field.required !== false) required.push(fieldKey);
	}

	const ref = `#/components/schemas/${key}`;
	const asResponse = (description = 'Successful response') => ({
		description,
		content: {
			'application/json': {
				schema: { $ref: ref },
			},
		},
	});
	const asRequest = (description = 'Input') => ({
		description,
		required: true,
		content: { 'application/json': { schema: { $ref: ref } } },
	});

	// TODO: take in type here
	const schema = { properties, type: 'object', required } as const;

	// add the schema to the global schemas object
	schemas[key] = schema;
	return {
		key,
		ref,
		schema,
		asResponse,
		asRequest,
	};
};
