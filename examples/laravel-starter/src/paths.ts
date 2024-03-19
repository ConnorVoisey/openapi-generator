import { type Paths, path } from '~/index';
import {
	registerRequestSchema,
	authenticateRequestSchema,
	todoCreateSchema,
	todoSchema,
	validationErrorSchema,
	unauthenticatedErrorSchema,
	todoUpdateSchema,
	profileSchema,
	todoArraySchema,
	internalErrorSchema,
} from './schemas';
import { manageAuthTag, requiresAuthTag, todoTag } from './tags';
import { Type } from '@sinclair/typebox';

export const paths: Paths = {};

path('/todo', {}, paths)
	.get({
		tags: [todoTag, requiresAuthTag],
		summary: 'Get all todos',
		description: 'Get all the todos assigned to the logged in user',
		operationId: 'indexTodo',
		responses: {
			200: todoArraySchema.asResponse(),
			401: unauthenticatedErrorSchema.asResponse(),
			500: internalErrorSchema.asResponse(),
		},
	})
	.post({
		tags: [todoTag],
		summary: 'Create a todo',
		description: 'Creates a todo assigned to the user.',
		operationId: 'storeTodo',
		requestBody: todoCreateSchema.asRequest(),
		responses: {
			201: todoSchema.asResponse('Created'),
			401: unauthenticatedErrorSchema.asResponse(),
			422: validationErrorSchema.asResponse(),
			500: internalErrorSchema.asResponse(),
		},
	});
path(
	'/todo/{todo}/',
	{
		todo: {
			schema: Type.String({ format: 'uuid' }),
		},
	},
	paths,
)
	.get({
		tags: [todoTag],
		summary: 'Gets a todo',
		description:
			'Get one todos from its id, it must be assigned to the logged in user',
		operationId: 'showTodo',
		responses: {
			200: todoSchema.asResponse(),
			401: unauthenticatedErrorSchema.asResponse(),
			500: internalErrorSchema.asResponse(),
		},
	})
	.patch({
		tags: [todoTag, requiresAuthTag],
		summary: 'Update a todo',
		description: 'Updates a todo, must be assigned to the user.',
		operationId: 'updateTodo',
		requestBody: todoUpdateSchema.asRequest(),
		responses: {
			201: todoSchema.asResponse('Created'),
			401: unauthenticatedErrorSchema.asResponse(),
			422: validationErrorSchema.asResponse(),
			500: internalErrorSchema.asResponse(),
		},
	})
	.delete({
		tags: [todoTag, requiresAuthTag],
		summary: 'Delete a todo',
		description: 'Deletes a todo, must be assigned to the user.',
		operationId: 'deleteTodo',
		responses: {
			204: {
				description: 'Successfully Deleted',
			},
			401: unauthenticatedErrorSchema.asResponse(),
			500: internalErrorSchema.asResponse(),
		},
	});

path('/auth/register', {}, paths).post({
	tags: [manageAuthTag],
	summary: 'Register',
	description: 'Register route',
	operationId: 'register',
	requestBody: registerRequestSchema.asRequest(),
	responses: {
		204: {
			description: 'Succssfully logged in',
		},
		401: unauthenticatedErrorSchema.asResponse(),
		422: validationErrorSchema.asResponse(),
		500: internalErrorSchema.asResponse(),
	},
});
path('/auth/login', {}, paths).post({
	tags: [manageAuthTag],
	summary: 'Login',
	description: 'Login route',
	operationId: 'login',
	requestBody: authenticateRequestSchema.asRequest(),
	responses: {
		204: {
			description: 'Succssfully logged in',
		},
		422: validationErrorSchema.asResponse(),
		500: internalErrorSchema.asResponse(),
	},
});

path('/auth/logout', {}, paths).post({
	tags: [manageAuthTag],
	summary: 'Logout',
	description: 'Logs the current user out.',
	operationId: 'logout',
	responses: {
		204: {
			description: 'Succssfully logged out.',
			content: {
				'application/json': {
					schema: Type.Object({ foo: Type.String() }),
				},
			},
		},
		401: unauthenticatedErrorSchema.asResponse(),
		500: internalErrorSchema.asResponse(),
	},
});

path('/user', {}, paths).get({
	tags: [requiresAuthTag],
	summary: 'Profile',
	description: 'Gets the profile of the currently logged in user.',
	operationId: '/user-get',
	responses: {
		200: profileSchema.asResponse(),
		401: unauthenticatedErrorSchema.asResponse(),
		500: internalErrorSchema.asResponse(),
	},
});
