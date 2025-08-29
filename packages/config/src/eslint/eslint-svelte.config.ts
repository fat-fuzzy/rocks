import type {FlatConfig} from '@eslint/compat'
import svelte from 'eslint-plugin-svelte'
import ts from 'typescript-eslint'
import baseConfig from './eslint-base.config.js'

// Svelte Specific Configuration Array
export const svelteConfigOverrides = [
	// svelte.configs.prettier is often included in svelte.configs.recommended or handled by top-level prettier
	...svelte.configs.recommended, // Svelte specific rules and parser setup
	{
		files: ['**/*.svelte', '**/*.svx'], // Ensure this targets only .svelte files if TS/JS files are handled by baseConfig
		languageOptions: {
			parserOptions: {
				projectService: true, // For type-aware linting in <script lang="ts">
				extraFileExtensions: ['.svelte', '.svx'],
				parser: ts.parser, // For <script lang="ts"> within .svelte files
			},
		},
		// Add Svelte-specific rules or overrides here
	},
] as FlatConfig[]

// Combined Svelte configuration (base + Svelte overrides)
export default [
	...baseConfig,
	...svelteConfigOverrides,
	// You might still want the svelte.configs.prettier here if not covered
	// For example, if svelte.configs.recommended doesn't include it:
	// ...svelte.configs.prettier
] as FlatConfig[]
