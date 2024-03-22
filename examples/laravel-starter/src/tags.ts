import { getTagBuilder } from '~/index';

export const { tags, addTag } = getTagBuilder();
export const manageAuthTag = addTag({
	name: 'Manage Auth',
	description: 'Routes involving managing authentication.',
});

export const requiresAuthTag = addTag({
	name: 'Requires Auth',
	description: 'Routes that require the user to be logged in.',
});

export const todoTag = addTag({
	name: 'Todo Module',
	description: 'Routes that involve the todo module.',
});
