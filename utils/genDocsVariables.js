// Import
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

// Variables
const result = {};
const dirDist = path.resolve(__dirname, '../dist/cjs');
let files;
const promises = [];

// Analyze dist files
(async () => {
	const t0 = Date.now();

	// Get files from dist folder
	files = fs.readdirSync(dirDist, {recursive: true})
	files = files.filter((file) => /\.js$/.test(file));

	// Get stats
	for (let filePath of files) {
		const p = new Promise(async (resolve, reject) => {
			const file = await fs.promises.readFile(path.resolve(dirDist, filePath));
			const name = filePath.split(path.sep).pop().replace('.js', '');
			const gzip = await new Promise((resolve, reject) => {
				zlib.gzip(file, (err, buffer) => {
					if (err) throw new Error(err);

					resolve((Buffer.byteLength(buffer)/1024).toFixed(2) + ' kB');
				});
			});

			result[name] = {
				raw: (Buffer.byteLength(file)/1024).toFixed(2) + ' kB',
				gzip 
			}

			resolve();
		});

		promises.push(p);
	}

	await Promise.all(promises);

	// Save results
	const resultPath = 'docs/.vitepress/stats.json';
	fs.writeFileSync(path.resolve(__dirname, `../${resultPath}`), JSON.stringify(result));

	console.log(`Dist stats saved at ./${resultPath} (${Date.now() - t0}ms)`);
})();