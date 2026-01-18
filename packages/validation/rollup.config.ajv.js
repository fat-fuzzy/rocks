import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
export default [
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/ajv/out/validate.ajv.mjs',
		output: [
			{
				name: 'ajv.validate',
				file: 'dist/ajv/ajv.validate.cjs.js',
				format: 'cjs',
				plugins: [terser()],
			},
			{
				name: 'ajv.validate',
				file: 'dist/ajv/ajv.validate.esm.js',
				format: 'es',
				plugins: [commonjs({transformMixedEsModules: true}), terser()],
			},
		],
	},
]
