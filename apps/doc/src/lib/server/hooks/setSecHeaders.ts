import type {Handle} from '@sveltejs/kit'

export const UnsafeMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

export const setSecHeaders =
	(): Handle =>
	async ({event, resolve}) => {
		event.setHeaders({
			'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
			'X-Frame-Options': 'SAMEORIGIN always',
			'X-Content-Type-Options': 'nosniff always',
		})
		return resolve(event)
	}
