import path from 'node:path'
import {mdsvex} from 'mdsvex'
import adapter from '@sveltejs/adapter-cloudflare'
import mdsvexConfig from './mdsvex.config.js'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

import {defineConfig} from 'vitest/config'
import {sveltekit} from '@sveltejs/kit/vite'

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', '.md', '.svx'],

			// Consult https://github.com/sveltejs/svelte-preprocess
			// for more information about preprocessors
			preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			alias: {
				$config: path.resolve('./src/config'),
				$data: path.resolve('./src/data'),
				$types: path.resolve('./src/lib/types/index.ts'),
				$schemas: path.resolve('./src/schemas'),
				$tests: path.resolve('./tests'),
				$lib: path.resolve('./src/lib'),
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
					'default-src': ['self'],
					'style-src': ['self', 'data:'],
					'style-src-elem': ['self'],
					'style-src-attr': ['unsafe-inline'], // FIXME
					'base-uri': ['self'],
					'child-src': ['self'],
					'connect-src': ['self'],
					'font-src': ['self'],
					'form-action': ['self'],
					'frame-ancestors': ['none'],
					'frame-src': ['none'],
					'img-src': ['self', 'data:'],
					'media-src': ['self', 'data:'],
					'object-src': ['none'],
					// 'require-trusted-types-for': ["script"], // See SvelteKit Issues above
					'upgrade-insecure-requests': true,
					'worker-src': ['self', 'blob:'],
				},
			},
			inspector: {
				toggleKeyCombo: 'meta-shift-G',
			},
		}),
	],
	// server: {
	// 	host: true, // Open to local network and display URL
	// },
	test: {
		reporters: ['html'],
		include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
		coverage: {
			enabled: true,
			provider: 'v8',
			include: ['src/**/*.{js,ts}'],
			exclude: [
				'src/app.d.ts',
				'src/**/browser/*.{js,ts}',
				'src/**/definitions.{js,ts}',
				'src/lib/types/**/*.{js,ts}',
				'src/lib/**/*.browser.ts',
				'src/schemas', // TODO: review need
				'src/lib/generated',
				'src/lib/index.ts',
				'src/lib/components/',
			],
		},
	},
})
