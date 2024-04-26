const json = require('@rollup/plugin-json');

module.exports = {
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
	plugins: [json()],
};
