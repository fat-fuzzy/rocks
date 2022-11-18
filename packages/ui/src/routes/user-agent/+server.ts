import {json} from '@sveltejs/kit'
import type {RequestHandler} from './$types'

export const GET: RequestHandler = (event) => {
	// log all headers
	console.log(...event.request.headers)

	return json({
		// retrieve a specific header
		userAgent: event.request.headers.get('user-agent'),
	})
}
