import { Type } from '@sinclair/typebox';
import { schema } from './package/schemas';
export { schemas } from './package/schemas';

export const openapiSchema = schema({
	key: 'Openapi',
	schema: Type.Object({}),
});

export const todoSchema = schema({
	key: 'Todo',
	schema: Type.Object({
		id: Type.String({ format: 'uuid' }),
		task: Type.String(),
		completed: Type.Optional(Type.Boolean()),
		created_at: Type.String({ format: 'date-time' }),
		updated_at: Type.Optional(Type.String({ format: 'date-time' })),
	}),
});

export const todoCreateSchema = schema({
	key: 'TodoCreate',
	schema: Type.Object({
		task: Type.String(),
		completed: Type.Optional(Type.Boolean()),
	}),
});

export const authenticateRequestSchema = schema({
	key: 'AuthenticateRequest',
	schema: Type.Object({
		email: Type.String({ format: 'email' }),
		password: Type.String({ format: 'password' }),
	}),
});

export const validationErrorSchema = schema({
	key: 'Validation Error',
	schema: Type.Object({
		message: Type.String(),
		errors: Type.Record(Type.String(), Type.Array(Type.String())),
	}),
});
