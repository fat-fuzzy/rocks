/**
 * Set security headers for the application.
 * This includes Content Security Policy (CSP) and other security-related headers.
 * Resources:
 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
 * - https://web.dev/articles/csp
 * - https://scotthelme.co.uk/content-security-policy-an-introduction/
 * - https://github.com/rodneylab/sveltekit-blog-mdx/blob/main/src/hooks.server.js
 */

import type {Handle} from '@sveltejs/kit'

const DEFAULT_DIRECTIVES: Record<string, string[]> = {
	'base-uri': ["'self'"],
	'child-src': ["'self'"],
	'connect-src': ["'self'"],
	'default-src': ["'self'"],
	'font-src': ["'self'"],
	'form-action': ["'self'"],
	'frame-ancestors': ["'self'"],
	'frame-src': ["'self'"],
	'img-src': ["'self'", 'data:', 'https://fat-fuzzy.goatcounter.com/count'],
	'media-src': ["'self' data:"],
	'object-src': ["'self'"],
	'plugin-types': ["'self'"],
	'require-trusted-types-for': ["'script'"],
	sandbox: ['allow-same-origin'], // 'allow-same-origin' allows scripts to run in the sandbox https://web.dev/articles/sandboxed-iframes
	'script-src': ["'self'"],
	'script-src-attr': ["'self'"],
	'style-src': ["'self'"],
	'upgrade-insecure-requests': [],
	'worker-src': ["'self'"],
}

const TEST_DIRECTIVES: Record<string, string[]> = {
	// 'report-to': ['csp-endpoint'],
	// 'report-uri': [],
}

function formatCsp(csp: Record<string, string[]>): string {
	const defaultDirectives = Object.entries(csp).map(([key, directives]) => {
		return `${key} ${directives.join(' ')}`
	})

	return defaultDirectives.join('; ')
}

export const setCspHeaders =
	(): Handle =>
	async ({event, resolve}) => {
		event.setHeaders({
			'Content-Security-Policy': formatCsp(DEFAULT_DIRECTIVES),
			// 'Content-Security-Policy-Report-Only': formatCsp(TEST_DIRECTIVES),
			// 'Reporting-Endpoints': 'csp-endpoint="https://example.com/csp-reports"',
		})
		return resolve(event)
	}

export const setSecHeaders =
	(): Handle =>
	async ({event, resolve}) => {
		event.setHeaders({
			'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
			'Referrer-Policy': 'strict-origin-when-cross-origin',
			'X-Frame-Options': 'SAMEORIGIN',
			'X-Content-Type-Options': 'nosniff',
		})
		return resolve(event)
	}
