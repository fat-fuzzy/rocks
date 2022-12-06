import {error} from '@sveltejs/kit'
import type {RequestHandler} from './$types'
import {json} from '@sveltejs/kit'
import {fetchSketchesData} from '../../../utils/sketches'

/**
 * API Endpoint /api/ui
 * @returns array of ui library components
 */

export const GET: RequestHandler = async () => {
	console.log('GET sketches / fetchSketchesData')
	console.log(fetchSketchesData)
	console.log('GET sketches / response')
	const response = await fetchSketchesData()
	console.log(response)
	if (response) {
		return json(response)
	}
	throw error(404, 'Not found')
}
