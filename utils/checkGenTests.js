const fs = require('fs');
const path = require('path');

const dirTestOutput = path.resolve(__dirname, '../tests/generated');
const files = fs.readdirSync(dirTestOutput);

console.log('Check generated tests files @ ci');

for (let fileName of files) {
	const file = fs.readFileSync(path.resolve(dirTestOutput, fileName), {encoding: 'utf-8'});

	console.log('--------------------------');
	console.log(fileName, ':', '\n');
	console.log(file);
	console.log('--------------------------');
}