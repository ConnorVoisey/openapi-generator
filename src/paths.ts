import {
	authenticateRequestSchema,
	openapiSchema,
	todoCreateSchema,
	todoSchema,
} from './schemas';
import { pathUrl } from './package/paths';
import { manageAuthTag, requiresAuthTag, todoTag } from './tags';
export { paths } from './package/paths';

// ideally the path parts should be constructed with a clean looking function like this
// pathUrl`/user/${pathParam.string('userId')}`;

const val = pathUrl`/user/${{
	name: 'userId',
	schema: { type: 'string', properties: {} },
}}/edit/${{
	name: 'secondId',
	schema: { type: 'string', properties: {} },
}}`.get({
	responses: {},
	operationId: '',
	tags: [],
	description: '',
	summary: '',
});
console.dir({ val }, { depth: null });

pathUrl`/todo`
	.get({
		tags: [todoTag],
		summary: 'Get all todos',
		description: 'Get all the todos assigned to the logged in user',
		operationId: 'indexTodo',
		responses: {
			200: todoSchema.asResponse(),
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

pathUrl`/todo/${{ name: 'todo', schema: { type: 'string', properties: {} } }}`
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
		requestBody: todoCreateSchema.asRequest(),
		responses: {
			201: todoSchema.asResponse('Created'),
		},
	});

pathUrl`/openapi`.get({
	tags: ['Openapi'],
	summary: 'Json Openapi',
	description: 'This sites json openapi spec',
	operationId: 'openapiJson',
	responses: {
		200: openapiSchema.asResponse(),
	},
});

pathUrl`/auth/login`.post({
	tags: [manageAuthTag],
	summary: 'Login',
	description: 'Login route',
	operationId: 'login',
	requestBody: authenticateRequestSchema.asRequest(),
	responses: {
		204: {
			description: 'Succssfully logged in',
		},
	},
});

pathUrl`/auth/logout`.post({
	tags: [manageAuthTag],
	summary: 'Logout',
	description: 'Logs the current user out.',
	operationId: 'logout',
	responses: {
		204: {
			description: 'Succssfully logged out.',
		},
	},
});
