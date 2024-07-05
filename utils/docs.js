// Imports
const fs = require('fs');
const path = require('path');
const jsdocToMarkdown = require('jsdoc-to-markdown');

// Data
const markDownValidator = jsdocToMarkdown.renderSync({ files: './src/*.js' });
const markDownMethods = jsdocToMarkdown.renderSync({ files: './src/validators/*.js' });

const markdown = `
# Docs
## validator
${markDownValidator}
## methods
${markDownMethods}
`;

// Save as README.md
fs.writeFileSync(path.resolve(__dirname, '../README.md'), markdown);