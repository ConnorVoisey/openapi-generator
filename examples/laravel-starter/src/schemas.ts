import { Static, Type } from '@sinclair/typebox';
import { schema } from '~/schemas';
export { schemas } from '~/schemas';

export const openapiSchema = schema({
	key: 'Openapi',
	schema: Type.Object({}),
});

const todoModel = Type.Object({
	id: Type.String({ format: 'uuid' }),
	task: Type.String(),
	completed: Type.Optional(Type.Boolean()),
	created_at: Type.String({ format: 'date-time' }),
	updated_at: Type.Optional(Type.String({ format: 'date-time' })),
});
export const todoSchema = schema({
	key: 'Todo',
	schema: todoModel,
});
export const todoArraySchema = schema({
	key: 'Todo Array',
	schema: Type.Array(todoModel),
});

export const todoCreateSchema = schema({
	key: 'TodoCreate',
	schema: Type.Object({
		task: Type.String(),
		completed: Type.Optional(Type.Boolean()),
	}),
});

export const todoUpdateSchema = schema({
	key: 'TodoUpdate',
	schema: Type.Object({
		task: Type.Optional(Type.String()),
		completed: Type.Optional(Type.Boolean()),
	}),
});

export const registerRequestSchema = schema({
	key: 'RegisterRequest',
	schema: Type.Object({
		name: Type.String({ examples: ['Testing'] }),
		email: Type.String({ format: 'email', examples: ['test@test.test'] }),
		password: Type.String({ format: 'password', examples: ['password'] }),
		password_confirmation: Type.String({
			format: 'password',
			examples: ['password'],
		}),
	}),
});

export const authenticateRequestSchema = schema({
	key: 'AuthenticateRequest',
	schema: Type.Object({
		email: Type.String({ format: 'email', examples: ['test@test.test'] }),
		password: Type.String({ format: 'password', examples: ['password'] }),
	}),
});

export const unauthenticatedErrorSchema = schema({
	key: 'Unauthenticated Error',
	schema: Type.Object({
		message: Type.Literal('Unauthenticated.'),
	}),
	responseDefaultDescription: 'Unauthenticated',
});

export const validationErrorSchema = schema({
	key: 'Validation Error',
	schema: Type.Object({
		message: Type.String(),
		errors: Type.Object(
			{},
			{ additionalProperties: Type.Array(Type.String()) },
		),
	}),
	responseDefaultDescription: 'Unprocessable Entity',
});

export const internalErrorSchema = schema({
	key: 'Internal Server Error',
	schema: Type.Object({
		message: Type.String(),
	}),
	responseDefaultDescription: 'Internal Server Error',
});

export const profileSchema = schema({
	key: 'Profile Schema',
	schema: Type.Object({
		id: Type.String({ format: 'uuid' }),
		name: Type.String(),
		email: Type.String({ format: 'email' }),
		email_verified_at: Type.Union([
			Type.String({ format: 'date-time' }),
			Type.Null(),
		]),
		created_at: Type.String({ format: 'date-time' }),
		updated_at: Type.String({ format: 'date-time' }),
	}),
});
