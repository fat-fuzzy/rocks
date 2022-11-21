import path from 'path'
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	// preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		alias: {
			$layout: path.resolve('./src/lib/layout'),
			$blocks: path.resolve('./src/lib/blocks'),
			$utils: path.resolve('./src/lib/utils'),
			$styles: path.resolve('./src/lib/styles'),
			$stores: path.resolve('./src/lib/stores'),
			$types: path.resolve('./src/lib/types'),
			$data: path.resolve('./src/data'),
		},

		prerender: {
			crawl: true,
		},
	},
	package: {
		source: path.resolve('./src/lib'),
		dir: path.resolve('./package'),
	},
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
	}),
}

export default config
