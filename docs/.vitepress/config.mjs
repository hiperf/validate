import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stats = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'stats.json')));

console.log('stats', stats);


// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "@hiperf/validate",
	description: "Simple. Ultra lightweight. Data validation solution.",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Getting started', link: '/getting-started' },
			{ text: 'Examples', link: '/examples' },
		],

		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'Getting started', link: '/getting-started' },
					{ text: 'Custom validation methods', link: '/custom-validation-methods' },
					{ text: 'Slim validate', link: '/slim' },
					{ text: 'Create validate', link: '/create' },
				]
			},
			{
				text: 'Validators',
				items: [
					{ text: 'isObject', link: '/getting-started' },
					{ text: 'isArray', link: '/custom-validators' },
					{ text: 'isNumber', link: '/slim' },
					{ text: 'isString', link: '/create' },
					{ text: 'isType', link: '/create' },
					{ text: 'isOneOfType', link: '/create' },
					{ text: 'isFunction', link: '/create' },
					{ text: 'isSymbol', link: '/create' },
					{ text: 'isMatch', link: '/create' }, // regex
				]
			},
			{
				text: 'Examples',
				items: [
					{ text: 'Basic-example', link: '/examples' },
				]
			}
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		]
	},

	async transformPageData(pageData, { siteConfig }) {
		if (pageData?.frontmatter?.layout == 'home') {
			for (let item of pageData.frontmatter.features) {
				item.details = item.details.replace('_baseSize_', stats.index.gzip);
				item.details = item.details.replace('_slimSize_', stats.slim.gzip);
			}
		}
	}
})
