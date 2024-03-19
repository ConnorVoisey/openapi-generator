import type { TArray, TObject } from '@sinclair/typebox';
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
type AsResponse = (description?: string) => OpenapiResponse;
type AsRequest = (description?: string) => RequestBody;
type TObjectSchema = (TObject | TArray) & {
	asResponse: AsResponse;
	asRequest: AsRequest;
};
export const schema: (
	input: {
		key: string;
		schema: TObject | TArray;
		responseDefaultDescription?: string;
		requestDefaultDescription?: string;
	},

	/** the created schema is added to main schemas object, this should be used as the openapi/components/schema **/
	schemas: Schemas,
) => TObjectSchema | TArray = (
	{ key, schema, responseDefaultDescription, requestDefaultDescription },
	schemas,
) => {
	const ref = `#/components/schemas/${key}`;
	const asResponse: AsResponse = (
		description = responseDefaultDescription ?? 'Successful Response',
	) => ({
		description,
		content: {
			'application/json': {
				schema: { $ref: ref },
			},
		},
	});
	const asRequest: AsRequest = (
		description = requestDefaultDescription ?? 'Input',
	) => ({
		description,
		required: true,
		content: { 'application/json': { schema: { $ref: ref } } },
	});

	const schemaWithMethods = Object.assign({ asRequest, asResponse }, schema);
	// add the schema to the global schemas object
	schemas[key] = schemaWithMethods;
	return schemaWithMethods;
};
