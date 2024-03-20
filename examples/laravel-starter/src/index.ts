import { serve } from '~/index';
import { openapi } from './openapi';

serve({
	watchDir: import.meta.dir,
	writePath: './openapi.json',
	port: 8000,
	openapi,
});
