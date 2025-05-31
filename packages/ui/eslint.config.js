import svelteEslint from '@fat-fuzzy/config/eslint/svelte' // Import the specific config array
import {includeIgnoreFile} from '@eslint/compat'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

// Correctly determine gitignorePath relative to *this* eslint.config.js file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Adjust '../../.gitignore' to point to your monorepo root .gitignore
const gitignorePath = path.resolve(__dirname, '../../.gitignore')

export default [
	// ESLint 9 expects an array
	includeIgnoreFile(gitignorePath), // Apply gitignore at the project level
	...svelteEslint, // Spread the imported shared configuration
	// Add any project-specific overrides or additional configurations here
	{
		// files: ['src/specific-app-folder/**/*.js'], // Example
		// rules: {
		//   'no-console': 'warn',
		// }
	},
]
