import type { Tag } from './types';

export const tag = (tag: Tag, tags: Tag[]) => {
	tags.push(tag);
	return tag.name;
};
