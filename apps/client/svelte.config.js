import path from 'path'
import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html',
		}),

		alias: {
			$utils: path.resolve('./src/utils'),
			$data: path.resolve('./src/data'),
		},
	},
}

export default config
