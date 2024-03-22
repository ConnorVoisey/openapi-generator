import { watch } from 'node:fs';
import type { Openapi } from './types';
import type { Server } from 'bun';

/**
 * Write the opneapi spec to a file
 * @param path The path that the spec will be written to
 * @param openapi The object that will be serialized then written to the file
 */
export const writeOpenapi = async (path: string, openapi: Openapi) => {
	console.log(`Writing openapi to: ${path}`);
	await Bun.write(path, JSON.stringify(openapi, null, 4));
};

/** The channel web socket messages will be sent on,
 * It doesn't matter what this value is as long as it is the same everywhere */
const docsChannel = 'docs';

/**
 * Hosts a webserver, any route with 'openapi.json' in it will return the openapi spec as json,
 * Any other route will return a html file using scalar to render the openapi spec.
 * There is also a websocket server that sends a message on file changes.
 * This is subscribed to in the default html file and refreshs the page on message
 */
export const serve = ({
	watchDir,
	port,
	openapi,
	writePath,
	beforeFileChange,
	afterFileChange,
}: {
	watchDir: string;
	port: number;
	openapi: Openapi;
	writePath?: string;
	beforeFileChange?: (server: Server) => void;
	afterFileChange?: (server: Server) => void;
}) => {
	watch(watchDir, { recursive: true }, (event, filename) => {
		console.log(`Reloading - Detected ${event} in ${filename}`);
		if (beforeFileChange) beforeFileChange(server);
		server.publish(docsChannel, 'reload');

		if (writePath !== undefined) writeOpenapi(writePath, openapi);

		if (afterFileChange) afterFileChange(server);
	});

	const server = Bun.serve({
		port,
		fetch(req) {
			const success = server.upgrade(req);
			if (success) {
				// Bun automatically returns a 101 Switching Protocols
				// if the upgrade succeeds
				return undefined;
			}
			const url = new URL(req.url);
			if (url.pathname.includes('openapi.json')) {
				const res = Response.json(openapi);
				res.headers.set('Access-Control-Allow-Origin', '*');
				res.headers.set(
					'Access-Control-Allow-Methods',
					'GET, POST, PUT, DELETE, OPTIONS',
				);
				return res;
			}
			return new Response(Bun.file(`${import.meta.dir}/index.html`));
		},
		websocket: {
			open(ws) {
				// connections must subscribe to the docs channel so that they can recieve updates on when to reload the page
				ws.subscribe(docsChannel);
			},
			message() {
				// connections do not send messages in so there is nothing to do here
			},

			close(ws) {
				// when a client disconnects, unsubscribe them from future updates
				ws.unsubscribe(docsChannel);
			},
		},
	});

	console.log(`Serving docs at: ${server.url}`);
	return server;
};
