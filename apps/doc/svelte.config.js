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
		/**
		 * This includes Content Security Policy (CSP) and other security-related headers.
		 * Verify:
		 * - https://securityheaders.com
		 * - Chrome DevTools Console & Security Panel
		 * - Firefox DevTools
		 * - Safari DevTools + Simulator
		 * CSP Resources:
		 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
		 * - https://web.dev/articles/csp
		 * - https://scotthelme.co.uk/content-security-policy-an-introduction/
		 * - https://svelte.dev/docs/kit/configuration#csp
		 *
		 * TODO:
		 * Known SvelteKit Issues with TrustedHTML:
		 * - https://github.com/sveltejs/svelte/issues/10826
		 * - https://github.com/sveltejs/svelte/issues/14438
		 * - Svelte announcer has inline style that violates CSP
		 * Plus:
		 * - tests fail
		 * - safari has issues in dev environment
		 */
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ["'self'"],
				'script-src': ["'self'", 'https://gc.zgo.at'],
				'style-src': ["'self'", 'data:'],
				'style-src-elem': ["'self'"],
				'style-src-attr': ["'self'"],
				'base-uri': ["'self'"],
				'child-src': ["'self'"],
				'connect-src': ["'self'", 'https://fat-fuzzy.goatcounter.com/count'],
				'font-src': ["'self'"],
				'form-action': ["'self'"],
				'frame-ancestors': ["'none'"],
				'frame-src': ["'none'"],
				'img-src': ["'self'", 'data:'],
				'media-src': ["'self'", 'data:'],
				'object-src': ["'self'"],
				// 'require-trusted-types-for': ["'script'"], // See SvelteKit Issues above
				'upgrade-insecure-requests': true,
				'worker-src': ["'self'", 'blob:'],
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
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'meta-shift-G',
		},
	},
}

export default config
