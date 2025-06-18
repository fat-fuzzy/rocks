import path from 'node:path'
import {mdsvex} from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-cloudflare'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

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
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({path, referrer, status, message}) => {
				// ignore deliberate link to shiny 404 page
				if (status === 404) {
					return
				}

				// otherwise fail the build
				throw new Error(message)
			},
		},
		alias: {
			$utils: path.resolve('./src/utils'),
			$data: path.resolve('./src/data'),
			$assets: path.resolve('./src/assets'),
			$types: path.resolve('./src/lib/types/index.d.ts'),
		},
	},
	build: {
		target: 'esnext',
	},
}

export default config
