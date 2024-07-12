// Imports
const fs = require('fs');
const path = require('path');
const jsdocToMarkdown = require('jsdoc-to-markdown');

// Data
const dirValidators = path.resolve(__dirname, '../src/validators/');
const dirDocs = path.resolve(__dirname, '../docs/');


// Generate docs for validators
(async () => {
	const validators = fs.readdirSync(dirValidators).filter(v => v !== 'index.js');
	const promises = [];
	const menu = [];

	for (let fileName of validators) {
		promises.push(new Promise(async (resolve, reject) => {
			let markdown = await jsdocToMarkdown.render({ files: path.resolve(dirValidators, fileName) });
			const name = fileName.replace('.js', '');

			menu.push({ text: name, link: `/validators/${name}` });
			markdown = `# ${name}\n${markdown}`;

			await fs.promises.writeFile(path.resolve(dirDocs, `validators/${name}.md`), markdown);

			resolve();
		}));
	}

	// Wait for all tasks
	await Promise.all(promises);

	// Sort menu items by alphabet
	menu.sort((a, b) => a.text.localeCompare(b.text));

	// Save
	await fs.promises.writeFile(
		path.resolve(dirDocs, `.vitepress/menu-validators.json`),
		JSON.stringify(menu)
	);
})();