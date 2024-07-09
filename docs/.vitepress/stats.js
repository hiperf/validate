import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stats = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'stats.json')));

export default {
	load() {
		return stats;
	}
}