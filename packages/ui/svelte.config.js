import path from 'path'
import adapter from '@sveltejs/adapter-cloudflare'
import preprocess from 'svelte-preprocess'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import stylelint from 'stylelint'

function isWebComponentSvelte(code) {
	const svelteOptionsIdx = code.indexOf('<svelte:options ')
	if (svelteOptionsIdx < 0) {
		return false
	}
	const tagOptionIdx = code.indexOf('tag=', svelteOptionsIdx)
	const svelteOptionsEndIdx = code.indexOf('>', svelteOptionsIdx)
	return tagOptionIdx > svelteOptionsIdx && tagOptionIdx < svelteOptionsEndIdx
}

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
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: stylelint({
				include: ['src/styles/scss/**/*.{scss}'],
			}),
			// scss: {
			// 	outFile: '/styles/app/ui.css',
			// },
		}),
		mdsvex(mdsvexConfig),
	],
	build: {
		target: 'esnext',
	},
	vitePlugin: {
		// To compile WC on the go: https://github.com/sveltejs/vite-plugin-svelte/issues/270#issuecomment-1033190138
		experimental: {
			dynamicCompileOptions({code}) {
				if (isWebComponentSvelte(code)) {
					return {
						customElement: true,
					}
				}
			},
		},
	},
}

export default config
