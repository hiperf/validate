import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stats = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'stats.json')));
const { version } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json')));

const menuValidators = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'menu-validators.json')));

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: '@hiperf/validate',
	description: 'Simple. Ultra lightweight. Data validation solution.',
	base: '/validate/',

	// https://vitepress.dev/reference/default-theme-config
	themeConfig: {
		siteTitle: '@hiperf/validate',
		nav: [
			{ text: 'Guide', link: '/getting-started' },
			{ text: 'Examples', link: '/examples/basic' },
			{ text: version, link: 'https://github.com/hiperf/validate/blob/main/CHANGELOG.md' },
		],
		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'Getting started', link: '/getting-started' },
					{ text: 'Custom validation methods', link: '/custom-validation-methods' },
					{ text: 'Detailed errors', link: '/detailed-errors' },
					{ text: 'Slim version', link: '/slim' },
					{ text: 'Create own validate', link: '/create' },
					{ text: 'Internationalization', link: '/Internationalization' },
					{ text: 'Typescript', link: '/typescript' },
				]
			},
			{
				text: 'Validators',
				items: menuValidators
			},
			{
				text: 'Examples',
				items: [
					{ text: 'Basic', link: '/examples/basic' },
				]
			}
		],
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/hiperf/validate' }
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
