import path from 'path'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-cloudflare'
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
			$utils: path.resolve('./src/utils'),
			$data: path.resolve('./src/data'),
			$assets: path.resolve('./src/assets'),
		},
	},
	build: {
		target: 'esnext',
	},
}

export default config
