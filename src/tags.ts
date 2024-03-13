import { tag } from './package/tags';
export { tags } from './package/tags';

export const manageAuthTag = tag({
	name: 'Manage Auth',
	description: 'Routes involving managing authentication.',
});

export const requiresAuthTag = tag({
	name: 'Requires Auth',
	description: 'Routes that require the user to be logged in.',
});

export const todoTag = tag({
	name: 'Todo Module',
	description: 'Routes that involve the todo module.',
});
