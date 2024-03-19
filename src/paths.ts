import type { HttpMethod, Parameter, Path, Paths, Schema } from './types';

type RouteBuilder = Record<HttpMethod, (path: Path) => RouteBuilder>;
type PathParams<T extends string> =
	T extends `${string}{${infer Param}}${infer Rest}`
		? {
				[K in Param | keyof PathParams<Rest>]: K extends Param
					? PathPartial
					: // @ts-ignore //TODO: remove this and fix the type
					  PathParams<Rest>[K];
		  }
		: Record<never, never>;

type PathPartial = {
	description?: string;
	deprecated?: boolean;
	schema: Schema;
};

export const path: <T extends string, P extends PathParams<T>>(
	path: T,
	params: P,
	paths: Paths,
) => RouteBuilder = (path, params, paths) => {
	const parameters: Parameter[] = [];
	for (const name in params) {
		// @ts-ignore //TODO: remove this by fixing the type
		const parameter: Parameter = {
			in: 'path',
			required: true,
			name,
			...params[name],
		};
		parameters.push(parameter);
	}
	paths[path] = { parameters };
	const builder: RouteBuilder = {
		get: (pathArg) => {
			paths[path].get = pathArg;
			return builder;
		},
		post: (pathArg) => {
			paths[path].post = pathArg;
			return builder;
		},
		patch: (pathArg) => {
			paths[path].patch = pathArg;
			return builder;
		},
		put: (pathArg) => {
			paths[path].put = pathArg;
			return builder;
		},
		delete: (pathArg) => {
			paths[path].delete = pathArg;
			return builder;
		},
	};

	return builder;
};
