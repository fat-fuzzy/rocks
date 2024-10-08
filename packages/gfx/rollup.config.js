import {createRequire} from 'module'
import terser from '@rollup/plugin-terser'
const require = createRequire(import.meta.url)
const pkg = require('./package.json')

export default [
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		output: [
			{
				file: pkg.module,
				format: 'es',
				plugins: [terser()],
			},
		],
		external: ['sharp'],
	},
]
