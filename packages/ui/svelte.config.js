import path from 'path'
import adapter from '@sveltejs/adapter-cloudflare'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$stores: path.resolve('./src/lib/stores'),
			$utils: path.resolve('./src/utils'),
			$data: path.resolve('./src/data'),
			$types: path.resolve('./src/lib/types/'),
		},
	},
	extensions: ['.svelte', ...mdsvexConfig.extensions],
}

export default config
