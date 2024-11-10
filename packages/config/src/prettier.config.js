// @fat-fuzzy/config/prettier.config.js

export default {
	useTabs: true,
	singleQuote: true,
	printWidth: 80,
	bracketSpacing: false,
	semi: false,
	trailingComma: 'all',
	arrowParens: 'always',
	tabWidth: 2,
	plugins: ['prettier-plugin-svelte'],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
			},
		},
	],
}
