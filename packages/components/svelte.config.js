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
			$components: path.resolve('./src/lib/components'),
			$utils: path.resolve('./src/utils'),
			$styles: path.resolve('./src/styles'),
			$stores: path.resolve('./src/stores'),
			$types: path.resolve('./src/types'),
		},
	},

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
}

export default config
