import type { Tag } from './types';

export const tags: Tag[] = [];
export const tag = (tag: Tag) => {
	tags.push(tag);
	return tag.name;
};
