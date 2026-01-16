import terser from '@rollup/plugin-terser'

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'dist/index.js',
			file: 'dist/index.js',
			format: 'es',
		},
		external: ['ajv', 'ajv-formats', 'ajv-errors'],
		plugins: [terser()],
	},
]
