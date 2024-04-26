const fs = require("fs");
const path = require("path");
const jsdocToMarkdown = require("jsdoc-to-markdown");

const markDownValidator = jsdocToMarkdown.renderSync({ files: './src/*.js' });
const markDownMethod = jsdocToMarkdown.renderSync({ files: './src/validators/*.js' });

const markdown = `
# Документация validator
## Функция
${markDownValidator}
## Методы
${markDownMethod}
`;

// Путь и имя файла, куда нужно сохранить данные
const filePath = path.resolve(__dirname, '../README.md');
// Сохранение данных в файл
fs.writeFileSync(filePath, markdown);