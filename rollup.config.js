const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');
const bundleSize = require('rollup-plugin-bundle-size');
const terser = require('@rollup/plugin-terser');

module.exports = [
	{
		input: 'src/index.js',
		output: [
			{
				file: 'dist/es/index.js',
				format: 'es',
			},
			{
				file: 'dist/cjs/index.js',
				format: 'cjs',
			},
		],
		plugins: [
			replace({
				preventAssignment: true,
				values: {
					ROLLUP_IMPORT_VALIDATORS: "import libValidators from './validators/index'",
					ROLLUP_IMPORT_LOCALES: "import libLocales from './lang/index'",
				}
			}),
			json(),
			//terser(),
			bundleSize(),
		],
	},
	{
		input: 'src/slim.js',
		output: [
			{
				file: 'dist/es/slim/index.js',
				format: 'es',
			},
			{
				file: 'dist/cjs/slim/index.js',
				format: 'cjs',
			},
		],
		plugins: [
			json(),
			//terser(),
			bundleSize(),
		],
	}
];
