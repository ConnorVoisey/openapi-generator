import type { TArray, TObject } from '@sinclair/typebox';
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
type AsResponse = (description?: string) => OpenapiResponse;
type AsRequest = (description?: string) => RequestBody;
type TObjectSchema = (TObject | TArray) & {
	asResponse: AsResponse;
	asRequest: AsRequest;
};
export const schema: (input: {
	key: string;
	schema: TObject | TArray;
}) => TObjectSchema | TArray = ({ key, schema }) => {
	const ref = `#/components/schemas/${key}`;
	const asResponse: AsResponse = (description = 'Successful response') => ({
		description,
		content: {
			'application/json': {
				schema: { $ref: ref },
			},
		},
	});
	const asRequest: AsRequest = (description = 'Input') => ({
		description,
		required: true,
		content: { 'application/json': { schema: { $ref: ref } } },
	});

	const schemaWithMethods = Object.assign({ asRequest, asResponse }, schema);
	// add the schema to the global schemas object
	schemas[key] = schemaWithMethods;
	return schemaWithMethods;
};
