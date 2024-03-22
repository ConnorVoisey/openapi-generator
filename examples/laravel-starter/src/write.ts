/**
 * Writes the openapi spec to a file
 */

import { openapi } from './openapi';

// You could also write this to a yaml file with this package - https://github.com/nodeca/js-yaml
Bun.write('output.json', JSON.stringify(openapi, null, 4));
