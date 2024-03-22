import type { Tag } from './types';

export const getTagBuilder = () => {
	const tags: Tag[] = [];
	const addTag = (tag: Tag) => {
		tags.push(tag);
		return tag.name;
	};
	return {
		tags,
		addTag,
	};
};
