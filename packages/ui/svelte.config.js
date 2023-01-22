import path from 'path'
import adapter from '@sveltejs/adapter-cloudflare'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$layouts: path.resolve('./src/lib/layouts'),
			$blocks: path.resolve('./src/lib/blocks'),
			$styles: path.resolve('./src/lib/styles'),
			$utils: path.resolve('./src/utils'),
			$data: path.resolve('./src/data'),
			$stores: path.resolve('./src/lib/stores'),
			$types: path.resolve('./src/lib/types'),
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
	build: {
		target: 'esnext',
	},
}

export default config
