import { FieldFormat } from './types';
import { Field } from './schema';

// TODO: add faker and use it to generate example data for each field
// TODO: see if faker accepts a seed so the data is always the same

export const string: (input?: {
	required: boolean;
	format?: FieldFormat;
	example?: unknown;
}) => Field = ({ required, format, example } = { required: true }) => ({
	required,
	property: {
		type: 'string',
		format,
		example,
	},
});

export const uuid: (required?: boolean) => Field = (required = true) =>
	string({ required, format: 'uuid' });

export const dateTime: (required?: boolean) => Field = (required = true) =>
	string({ required, format: 'date-time' });

export const boolean: (required?: boolean) => Field = (required = true) => ({
	required,
	property: {
		type: 'boolean',
	},
});
