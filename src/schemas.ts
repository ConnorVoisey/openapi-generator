import * as field from './package/fields';
import { schema } from './package/schemas';
export { schemas } from './package/schemas';

export const openapiSchema = schema({
	key: 'Openapi',
	properties: { id: { type: 'string', format: 'uuid' } },
});
export const todoSchema = schema({
	key: 'Todo',
	properties: {
		id: field.uuid(),
		task: field.string(),
		completed: field.boolean(),
		created_at: field.dateTime(),
		update_at: field.dateTime(false),
	},
});
export const todoCreateSchema = schema({
	key: 'TodoCreate',
	properties: {
		task: { type: 'string' },
		completed: { type: 'boolean', required: false },
	},
});

export const authenticateRequestSchema = schema({
	key: 'AuthenticateRequest',
	properties: {
		email: field.string(),
		password: field.string(),
	},
});

export const validationErrorSchema = schema({
	key: 'Validation Error',
	properties: {
		message: field.string(),
		errors: field.object({ properties: { foo: { type: 'string' } } }),
	},
});
