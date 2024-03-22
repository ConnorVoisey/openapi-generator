import { Type } from '@sinclair/typebox';
import { getSchemaBuilder } from '~/index';

export const { addSchema, schemas } = getSchemaBuilder();

const todoModel = Type.Object({
	id: Type.String({ format: 'uuid' }),
	task: Type.String(),
	completed: Type.Optional(Type.Boolean()),
	created_at: Type.String({ format: 'date-time' }),
	updated_at: Type.Optional(Type.String({ format: 'date-time' })),
});
export const todoSchema = addSchema({
	key: 'Todo',
	schema: todoModel,
});
export const todoArraySchema = addSchema({
	key: 'TodoArray',
	schema: Type.Array(todoModel),
});

export const todoCreateSchema = addSchema({
	key: 'TodoCreate',
	schema: Type.Object({
		task: Type.String(),
		completed: Type.Optional(Type.Boolean()),
	}),
});

export const todoUpdateSchema = addSchema({
	key: 'TodoUpdate',
	schema: Type.Object({
		task: Type.Optional(Type.String()),
		completed: Type.Optional(Type.Boolean()),
	}),
});

export const registerRequestSchema = addSchema({
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

export const authenticateRequestSchema = addSchema({
	key: 'AuthenticateRequest',
	schema: Type.Object({
		email: Type.String({ format: 'email', examples: ['test@test.test'] }),
		password: Type.String({ format: 'password', examples: ['password'] }),
	}),
});

export const unauthenticatedErrorSchema = addSchema({
	key: 'UnauthenticatedError',
	schema: Type.Object({
		message: Type.Literal('Unauthenticated.'),
	}),
	responseDefaultDescription: 'Unauthenticated',
});

export const validationErrorSchema = addSchema({
	key: 'ValidationError',
	schema: Type.Object({
		message: Type.String(),
		errors: Type.Object(
			{},
			{ additionalProperties: Type.Array(Type.String()) },
		),
	}),
	responseDefaultDescription: 'Unprocessable Entity',
});

export const internalErrorSchema = addSchema({
	key: 'InternalServerError',
	schema: Type.Object({
		message: Type.String(),
	}),
	responseDefaultDescription: 'Internal Server Error',
});

const permissions = ['crud:users'] as const;
const roles = ['admin', 'user'] as const;
export const profileSchema = addSchema({
	key: 'ProfileSchema',
	schema: Type.Object({
		id: Type.String(),
		name: Type.String(),
		email: Type.String(),
		email_verified_at: Type.String(),
		created_at: Type.String(),
		updated_at: Type.String(),
		permissions: Type.Array(
			Type.Union(permissions.map((per) => Type.Literal(per))),
		),
		roles: Type.Array(Type.Union(roles.map((role) => Type.Literal(role)))),
	}),
});
