import { openapiSchema, todoCreateSchema, todoSchema } from './schema';
import { pathUrl } from './package/paths';
import { Tag } from './package/types';
export { paths } from './package/paths';

const todoTag: Tag = {
	name: 'Todo',
	description: 'Todo module',
};

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
		tags: [todoTag.name],
		summary: 'Get all todos',
		description: 'Get all the todos assigned to the logged in user',
		operationId: 'indexTodo',
		responses: {
			200: todoSchema.asResponse(),
		},
	})
	.post({
		tags: [todoTag.name],
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
		tags: [todoTag.name],
		summary: 'Gets a todo',
		description:
			'Get one todos from its id, it must be assigned to the logged in user',
		operationId: 'showTodo',
		responses: {
			200: todoSchema.asResponse(),
		},
	})
	.patch({
		tags: [todoTag.name],
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
