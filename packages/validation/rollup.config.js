import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const packageJson = require('./package.json')
export default [
	{
		input: 'src/main.js',
		output: {
			name: 'dist/index.js',
			file: 'dist/index.js',
			format: 'es',
		},
		external: ['ajv', 'ajv-formats', 'ajv-errors'],
	},
]
