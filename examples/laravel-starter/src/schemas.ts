import { Type } from '@sinclair/typebox';
import { type Schemas, schema } from '~/index';

export const schemas: Schemas = {};
const todoModel = Type.Object(
	{
		id: Type.String({ format: 'uuid' }),
		task: Type.String(),
		completed: Type.Optional(Type.Boolean()),
		created_at: Type.String({ format: 'date-time' }),
		updated_at: Type.Optional(Type.String({ format: 'date-time' })),
	},
	schemas,
);
export const todoSchema = schema(
	{
		key: 'Todo',
		schema: todoModel,
	},
	schemas,
);
export const todoArraySchema = schema(
	{
		key: 'Todo Array',
		schema: Type.Array(todoModel),
	},
	schemas,
);

export const todoCreateSchema = schema(
	{
		key: 'TodoCreate',
		schema: Type.Object({
			task: Type.String(),
			completed: Type.Optional(Type.Boolean()),
		}),
	},
	schemas,
);

export const todoUpdateSchema = schema(
	{
		key: 'TodoUpdate',
		schema: Type.Object({
			task: Type.Optional(Type.String()),
			completed: Type.Optional(Type.Boolean()),
		}),
	},
	schemas,
);

export const registerRequestSchema = schema(
	{
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
	},
	schemas,
);

export const authenticateRequestSchema = schema(
	{
		key: 'AuthenticateRequest',
		schema: Type.Object({
			email: Type.String({ format: 'email', examples: ['test@test.test'] }),
			password: Type.String({ format: 'password', examples: ['password'] }),
		}),
	},
	schemas,
);

export const unauthenticatedErrorSchema = schema(
	{
		key: 'Unauthenticated Error',
		schema: Type.Object({
			message: Type.Literal('Unauthenticated.'),
		}),
		responseDefaultDescription: 'Unauthenticated',
	},
	schemas,
);

export const validationErrorSchema = schema(
	{
		key: 'Validation Error',
		schema: Type.Object({
			message: Type.String(),
			errors: Type.Object(
				{},
				{ additionalProperties: Type.Array(Type.String()) },
			),
		}),
		responseDefaultDescription: 'Unprocessable Entity',
	},
	schemas,
);

export const internalErrorSchema = schema(
	{
		key: 'Internal Server Error',
		schema: Type.Object({
			message: Type.String(),
		}),
		responseDefaultDescription: 'Internal Server Error',
	},
	schemas,
);

const permissions = ['crud:users'] as const;
const roles = ['admin', 'user'] as const;
export const profileSchema = schema(
	{
		key: 'Profile Schema',
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
	},
	schemas,
);
