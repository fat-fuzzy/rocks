/** @type {import("prettier").Config} */
const config = {
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

export default config
