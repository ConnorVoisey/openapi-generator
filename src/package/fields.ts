import type { FieldFormat, FieldType } from './types';

export type Field = ArrayField | RecordField | BooleanField | StringField;

export type Property =
	| ArrayProperty
	| BooleanProperty
	| StringProperty
	| ObjectProperty;

type ArrayField = {
	type: 'array';
	properties: ArrayProperty;
};
type ArrayProperty = {
	required?: boolean;
	items: {
		minimum?: number;
		format?: FieldFormat;
		type: FieldType;
	};
	type: 'array';
};
type BooleanField = {
	property: BooleanProperty;
};
type BooleanProperty = {
	type: 'boolean';
};
type RecordField = {
	type: 'object';
	properties: Record<string, unknown>;
	additionalProperties: true;
};
type StringField = {
	property: StringProperty;
};
type StringFormat =
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
type StringProperty = {
	type: 'string';
	format?: StringFormat;
};
type ObjectProperty = {
	type: 'object';
	properties: Record<string | number, Property>;
	additionalProperties: boolean;
	required?: string[];
};

// TODO: add faker and use it to generate example data for each field
// TODO: see if faker accepts a seed so the data is always the same

export const string: (input?: {
	format?: StringFormat;
	example?: unknown;
}) => StringProperty = ({ format, example } = {}) => ({
	type: 'string',
	format,
	example,
});

export const uuid: (required?: boolean) => StringProperty = (
	required = true,
) => ({ type: 'string', format: 'uuid', required });

export const dateTime: (required?: boolean) => StringProperty = (
	required = true,
) => ({ type: 'string', required, format: 'date-time' });

export const boolean: (required?: boolean) => BooleanProperty = () => ({
	type: 'boolean',
});

export const record: (input: {
	properties: Record<string, unknown>;
}) => RecordField = ({ properties }) => ({
	type: 'object',
	properties,
	additionalProperties: true,
});

export const object: (input: {
	properties: Record<string | number, Property>;
	required?: string[];
}) => ObjectProperty = ({ properties, required }) => ({
	type: 'object',
	properties,
	additionalProperties: true,
	required,
});
