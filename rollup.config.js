const fs = require('node:fs');
const path = require('node:path');
const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');
const bundleSize = require('rollup-plugin-bundle-size');
const terser = require('@rollup/plugin-terser');

const dirDist = path.resolve(__dirname, 'dist');

module.exports = async (cliArg) => {
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
			input: `src/${fileName}.js`,
			output: [
				{
					file: `dist/es/${fileName}.mjs`,
					format: 'es',
					strict: false,
				},
				{
					file: `dist/cjs/${fileName}.js`,
					format: 'cjs',
					strict: false,
				},
			],
			plugins
		}
	}
	
	rollupConfig.push(genConfig('index'));
	rollupConfig.push(genConfig('slim'));
	rollupConfig.push(genConfig('create'));

	for (let filePath of validators) {
		const fileName = filePath.replace('.js', '');
		rollupConfig.push(genConfig(`validators/${fileName}`));
	}

	// Clear dist folder before run
	if (fs.existsSync(dirDist)) await fs.promises.rm(dirDist, { recursive: true });
	
	return rollupConfig;
}
