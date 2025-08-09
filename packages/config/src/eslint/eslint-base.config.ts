import prettier from 'eslint-config-prettier'
import js from '@eslint/js'
import type {FlatConfig} from '@eslint/compat'
import globals from 'globals'
import ts from 'typescript-eslint'

// Base JS/TS Configuration Array
export default [
	js.configs.recommended,
	...ts.configs.recommended, // For TypeScript files
	prettier, // Disables ESLint rules that conflict with Prettier
	{
		languageOptions: {
			globals: {...globals.browser, ...globals.node},
		},
		rules: {
			// Add base rules here
		},
	},
] as FlatConfig[]
