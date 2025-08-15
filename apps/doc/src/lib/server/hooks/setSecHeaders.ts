import type {Handle} from '@sveltejs/kit'

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
