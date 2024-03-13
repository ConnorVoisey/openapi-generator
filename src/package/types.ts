import { Property } from "./fields";

export type Info = {
	title: string;
	description: string;
	termsOfService?: string;
	contact?: { email: string };
	license?: { name: string; url: string };
	version: string;
};
export type ExternalDocs = {
	description: string;
	url: string;
};
export type Server = { url: string };
export type Tag = {
	name: string;
	description: string;
	externalDocs?: ExternalDocs;
};
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type ContentType = 'application/json';
export type SchemaKey = string;
export type OpenapiResponse = {
	description: string;
	content?: {
		[k in ContentType]?: {
			schema: { $ref: SchemaKey };
		};
	};
};
export type Path = {
	tags: string[];
	summary: string;
	description: string;
	operationId: string;
	requestBody?: {
		description: string;
		content: {
			[k in ContentType]?: {
				schema: {
					$ref: SchemaKey;
				};
			};
		};
		required: boolean;
	};
	responses: Record<number, OpenapiResponse>;
};
export type Paths = Record<string, Record<HttpMethod, Path>>;
export type FieldType = 'object' | 'integer' | 'string' | 'boolean';
export type FieldFormat =
	| 'int64'
	| 'date'
	| 'date-time'
	| 'password'
	| 'byte'
	| 'binary'
	| 'email'
	| 'uuid'
	| 'url'
	| 'hostname'
	| 'ipv4'
	| 'ipv6';

export type Schema = {
	type: FieldType;
	properties: Record<string, Property>;
};
type ParameterBase = {
	name: string;
	description?: string;
	deprecated?: boolean;
	schema: Schema;
};
export type Parameter = (
	| {
			in: 'query' | 'header' | 'cookie';
			description?: string;
			required?: boolean;
	  }
	| {
			in: 'path';
			description?: string;
			required: true;
	  }
) &
	ParameterBase;
export type Schemas = Record<SchemaKey, Schema>;
export type Openapi = {
	openapi: '3.0.2';
	info: Info;
	externalDocs?: ExternalDocs;
	servers: Server[];
	tags: Tag[];
	paths: Record<string, { [k in HttpMethod]?: Path }>;
	components: { schemas: Schemas };
};
