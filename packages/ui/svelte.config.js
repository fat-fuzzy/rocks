import path from 'path'
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		alias: {
			$lib: path.resolve('./src/lib'),
			$layout: path.resolve('./src/lib/layout'),
			$blocks: path.resolve('./src/lib/blocks'),
			$utils: path.resolve('./src/utils'),
			$styles: path.resolve('./src/styles'),
			$stores: path.resolve('./src/stores'),
			$types: path.resolve('./src/types'),
			$data: path.resolve('./src/data'),
		},

		prerender: {
			crawl: true,
		},
	},

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
	}),
}

export default config
