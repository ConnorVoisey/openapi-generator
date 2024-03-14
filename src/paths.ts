import {
	registerRequestSchema,
	authenticateRequestSchema,
	openapiSchema,
	todoCreateSchema,
	todoSchema,
	validationErrorSchema,
	unauthenticatedErrorSchema,
	todoUpdateSchema,
	profileSchema,
	todoArraySchema,
} from './schemas';
import { path } from './package/paths';
import { manageAuthTag, requiresAuthTag, todoTag } from './tags';
import { Type } from '@sinclair/typebox';
export { paths } from './package/paths';

// ideally the path parts should be constructed with a clean looking function like this
// pathUrl`/user/${pathParam.string('userId')}`;

path`/todo`
	.get({
		tags: [todoTag, requiresAuthTag],
		summary: 'Get all todos',
		description: 'Get all the todos assigned to the logged in user',
		operationId: 'indexTodo',
		responses: {
			200: todoArraySchema.asResponse(),
			401: unauthenticatedErrorSchema.asResponse(),
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
		},
	});

path`/todo/${{ name: 'todo', schema: { type: 'string', properties: {} } }}`
	.get({
		tags: [todoTag],
		summary: 'Gets a todo',
		description:
			'Get one todos from its id, it must be assigned to the logged in user',
		operationId: 'showTodo',
		responses: {
			200: todoSchema.asResponse(),
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
		},
	});

path`/openapi`.get({
	tags: ['Openapi'],
	summary: 'Json Openapi',
	description: 'This sites json openapi spec',
	operationId: 'openapiJson',
	responses: {
		200: openapiSchema.asResponse(),
	},
});

path`/auth/register`.post({
	tags: [manageAuthTag],
	summary: 'Register',
	description: 'Register route',
	operationId: 'register',
	requestBody: registerRequestSchema.asRequest(),
	responses: {
		204: {
			description: 'Succssfully logged in',
		},
		422: validationErrorSchema.asResponse(),
	},
});
path`/auth/login`.post({
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
	},
});

path`/auth/logout`.post({
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
	},
});

path`/user`.get({
	tags: [requiresAuthTag],
	summary: 'Profile',
	description: 'Gets the profile of the currently logged in user.',
	operationId: '/user-get',
	responses: {
		200: profileSchema.asResponse(),
	},
});
