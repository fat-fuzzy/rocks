import path from 'path'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter(),

		alias: {
			$lib: path.resolve('./src/lib'),
			$utils: path.resolve('./src/utils'),
			$styles: path.resolve('./src/styles'),
			$stores: path.resolve('./src/stores'),
			$types: path.resolve('./src/types'),
			$data: path.resolve('./src/data'),
		},
	},
}

export default config
