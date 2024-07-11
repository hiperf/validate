const fs = require('node:fs');
const path = require('node:path');

const dirSource = path.resolve(__dirname, '../docs-snippets');
const dirDocsOutput = path.resolve(__dirname, '../docs/.vitepress/snippets/generated');
const dirTestOutput = path.resolve(__dirname, '../tests/generated');
const files = fs.readdirSync(dirSource);

/**
 * Process source file and return files for docs and for tests
 * @param {string} str - source file as string
 * @returns {{forDocs: string, forTest: string}}
 */
function processFile(str) {
	const ar = str.split('\n');
	let forDocs = '';
	let forTest = '';

	// Iterate code by lines
	for (let i=0, line; i < ar.length; i++) {
		line = ar[i];

		// If it's for docs
		if (line.indexOf('//D') === 0) {
			forDocs += line.slice(4, line.length-1) + '\n';
		// If it's for test
		} else if (line.indexOf('//T') === 0) {
			forTest += line.slice(4, line.length-1) + '\n';
		// If it's for both
		} else {
			forDocs += line + '\n';
			forTest += line + '\n';
		}
	}

	return { forDocs, forTest };
}

(async () => {
	// Make sure that dirs exists and they are empty
	if (fs.existsSync(dirDocsOutput)) await fs.promises.rm(dirDocsOutput, {recursive : true});
	if (fs.existsSync(dirTestOutput)) await fs.promises.rm(dirTestOutput, {recursive : true});

	fs.mkdirSync(dirTestOutput, { recursive: true });
	fs.mkdirSync(dirDocsOutput, { recursive: true });

	for (let fileName of files) {
		const filePath = path.resolve(dirSource, fileName);
		const str = await fs.promises.readFile(filePath, {encoding: 'utf-8'});

		const { forDocs, forTest } = processFile(str);

		await fs.promises.writeFile(path.resolve(dirDocsOutput, fileName), forDocs);
		await fs.promises.writeFile(path.resolve(dirTestOutput, fileName.replace('.js', '.test.js')), forTest);
	}

	console.log(`${files.length} docs snippets and tests generated.`);
})();