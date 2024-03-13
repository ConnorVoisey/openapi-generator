import { watch } from 'fs';
import type { Openapi } from './types';

export const writeOpenapi = async (path: string, openapi: Openapi) => {
	console.log('writing');
	await Bun.write(path, JSON.stringify(openapi, null, 4));
};
export const serve = ({
	watchDir,
	port,
	openapi,
	writePath,
}: { watchDir: string; port: number; openapi: Openapi; writePath: string }) => {
	console.log({ path: watchDir });
	const docsChannel = 'docs';
	const watcher = watch(watchDir, { recursive: true }, (event, filename) => {
		console.log(`Detected ${event} in ${filename}`);
		server.publish(docsChannel, 'testing message');
		writeOpenapi(writePath, openapi);
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
			// console.log({ url });
			return new Response(Bun.file('src/package/index.html'));
		},
		websocket: {
			open(ws) {
				// console.log("subscribed");
				ws.subscribe(docsChannel);
			},
			async message(ws, message) {
				// console.log({ message });
				ws.send(`You said: ${message}`);
			},

			close(ws) {
				// console.log("closed");
				ws.unsubscribe(docsChannel);
			},
		},
	});

	console.log(`Serving at: ${server.url}`);
	return server;
};
