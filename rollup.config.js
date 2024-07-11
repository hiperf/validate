const fs = require('node:fs');
const path = require('node:path');
const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');
const bundleSize = require('rollup-plugin-bundle-size');
const terser = require('@rollup/plugin-terser');

module.exports = (cliArg) => {
	const rollupConfig = [];
	const minify = 'config-minify' in cliArg && cliArg['config-minify'];
	const sValidateBase = fs.readFileSync(path.resolve(__dirname, './src/rollup-import/validate-base.js'), {encoding: 'utf-8'});
	const validators = fs.readdirSync(path.resolve(__dirname, './src/validators/')).filter(v => v !== 'index.js');

	const plugins = [
		replace({
			preventAssignment: true,
			values: {
				ROLLUP_IMPORT_VALIDATE_BASE: sValidateBase,
				ROLLUP_IMPORT_VALIDATE_CREATE: sValidateBase.replace('export default', 'return'),
			}
		}),
		json(),
		minify ? terser() : {},
		bundleSize(),
	];

	function genConfig(fileName) {
		return {
			input: `src/${fileName}`,
			output: [
				{
					file: `dist/es/${fileName}`,
					format: 'es',
					strict: false,
				},
				{
					file: `dist/cjs/${fileName}`,
					format: 'cjs',
					strict: false,
				},
			],
			plugins
		}
	}
	
	rollupConfig.push(genConfig('index.js'));
	rollupConfig.push(genConfig('slim.js'));
	rollupConfig.push(genConfig('create.js'));

	for (let fileName of validators) {
		rollupConfig.push(genConfig(`validators/${fileName}`));
	}
	
	return rollupConfig;
}
