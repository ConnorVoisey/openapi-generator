import { type Tag, tag } from '~/index';

export const tags: Tag[] = [];
export const manageAuthTag = tag(
	{
		name: 'Manage Auth',
		description: 'Routes involving managing authentication.',
	},
	tags,
);

export const requiresAuthTag = tag(
	{
		name: 'Requires Auth',
		description: 'Routes that require the user to be logged in.',
	},
	tags,
);

export const todoTag = tag(
	{
		name: 'Todo Module',
		description: 'Routes that involve the todo module.',
	},
	tags,
);
