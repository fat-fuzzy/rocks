import path from 'path'
import adapter from '@sveltejs/adapter-auto'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$utils: path.resolve('./src/utils'),
			$data: path.resolve('./src/data'),
			$stores: path.resolve('./src/lib/stores'),
			$types: path.resolve('./src/lib/types'),
		},
	},
	extensions: ['.svelte', ...mdsvexConfig.extensions],
}

export default config
