import * as f from './package/fields';
import { schema } from './package/schema';
export { schemas } from './package/schema';

export const openapiSchema = schema({
	key: 'Openapi',
	fields: { id: f.uuid() },
});
export const todoSchema = schema({
	key: 'Todo',
	fields: {
		id: f.uuid(),
		task: f.string(),
		completed: f.boolean(),
		created_at: f.dateTime(),
		update_at: f.dateTime(false),
	},
});
export const todoCreateSchema = schema({
	key: 'TodoCreate',
	fields: {
		task: f.string(),
		completed: f.boolean(false),
	},
});
