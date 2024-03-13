import { watch } from 'fs';
import { Openapi } from './types';

export const server = ({
	watchDir,
	port,
	openapi,
}: { watchDir: string; port: number; openapi: Openapi }) => {
	// const watchDir = `${import.meta.dir}`;
	console.log({ path: watchDir });
	const docsChannel = 'docs';
	const watcher = watch(watchDir, { recursive: true }, (event, filename) => {
		// console.log(`Detected ${event} in ${filename}`);
		server.publish(docsChannel, 'testing message');
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
			if (url.pathname === '/openapi') {
				return Response.json(openapi);
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
