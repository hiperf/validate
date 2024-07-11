const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const os = require('node:os');

const dirSource = path.resolve(__dirname, '../docs-snippets');
const dirDocsOutput = path.resolve(__dirname, '../docs/.vitepress/snippets/generated');
const dirTestOutput = path.resolve(__dirname, '../tests/generated');
const files = fs.readdirSync(dirSource);

/**
 * Process source file and return files as string for docs and for tests
 * @param {string} filePath - source file path
 * @returns {{forDocs: string, forTest: string}}
 */
async function processFile(filePath) {
	let forDocs = '';
	let forTest = '';
	const fileStream = fs.createReadStream(filePath);

	// Create an interface to read the file line by line
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity // Recognize all instances of CR LF ('\r\n') as a single line break
	});

	// Use a for await...of loop to read each line asynchronously
	for await (const line of rl) {
		// If it's for docs
		if (line.indexOf('//D') === 0) {
			forDocs += line.slice(4) + os.EOL;
		// If it's for test
		} else if (line.indexOf('//T') === 0) {
			forTest += line.slice(4) + os.EOL;
		// If it's for both
		} else {
			forDocs += line + os.EOL;
			forTest += line + os.EOL;
		}
	}


	return { forDocs, forTest };
}

(async () => {
	// Make sure that dirs exists and they are empty
	if (fs.existsSync(dirDocsOutput)) await fs.promises.rm(dirDocsOutput, { recursive: true });
	if (fs.existsSync(dirTestOutput)) await fs.promises.rm(dirTestOutput, { recursive: true });

	fs.mkdirSync(dirTestOutput, { recursive: true });
	fs.mkdirSync(dirDocsOutput, { recursive: true });

	for (let fileName of files) {
		const filePath = path.resolve(dirSource, fileName);

		const { forDocs, forTest } = await processFile(filePath);

		await fs.promises.writeFile(path.resolve(dirDocsOutput, fileName), forDocs);
		await fs.promises.writeFile(path.resolve(dirTestOutput, fileName.replace('.js', '.test.js')), forTest);
	}

	console.log(`${files.length} docs snippets and tests generated.`);
})();