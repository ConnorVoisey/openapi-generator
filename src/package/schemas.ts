import { TObject } from '@sinclair/typebox';
import type { Property } from './fields';
import type { OpenapiResponse, RequestBody, Schema, Schemas } from './types';

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

export const schemas: Record<string, TObjectSchema> = {};
type TObjectSchema = TObject & {
	asResponse: (description?: string) => OpenapiResponse;
	asRequest: (description?: string) => RequestBody;
};
export const schema: (input: {
	key: string;
	schema: TObject;
}) => TObjectSchema = ({ key, schema }) => {
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

	const schemaWithMethods = Object.assign(schema, { asRequest, asResponse });
	// add the schema to the global schemas object
	schemas[key] = schemaWithMethods;
	return schemaWithMethods;
};
