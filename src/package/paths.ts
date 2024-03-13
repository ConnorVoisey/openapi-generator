import type { HttpMethod, Parameter, Path, Schema } from './types';

export const paths: Record<
	string,
	{ [k in HttpMethod]?: Path } & { parameters: Parameter[] }
> = {};
type RouteBuilder = Record<HttpMethod, (path: Path) => RouteBuilder>;
export const pathUrl: (
	pathSegments: TemplateStringsArray,
	...args: {
		name: string;
		description?: string;
		deprecated?: boolean;
		schema: Schema;
	}[]
) => RouteBuilder = (pathSegments, ...args) => {
	console.log({ path: pathSegments, args });

	let url = '';
	for (let i = 0; i < pathSegments.length; i++) {
		if (url[i] === '/') url += '/';
		url += pathSegments[i];
		if (args[i] !== undefined) url = `${url}{${args[i].name}}`;
	}
	const inObj = { in: 'path', required: true } as const;
	const parameters = args.map((param) => Object.assign(param, inObj));
	paths[url] = { parameters };
	const builder: RouteBuilder = {
		get: (path) => {
			paths[url].get = path;
			return builder;
		},
		post: (path) => {
			paths[url].post = path;
			return builder;
		},
		patch: (path) => {
			paths[url].patch = path;
			return builder;
		},
		put: (path) => {
			paths[url].put = path;
			return builder;
		},
		delete: (path) => {
			paths[url].delete = path;
			return builder;
		},
	};

	return builder;
};
