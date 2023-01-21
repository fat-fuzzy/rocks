import {error} from '@sveltejs/kit'
import type {RequestHandler} from './$types'
import {json} from '@sveltejs/kit'
import {fetchComponentData} from '$utils/stories'

const DEFAULT_OPTIONS = {
	theme: {light: 'day', contrast: 'low'},
	variant: '',
	size: 'md',
	color: '',
	layout: 'switcher',
	// app: 'ui', // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component context): maybe: use web components ?
	icon: '✨',
}
/**
 * API Endpoint /api/ui
 * @returns array of ui library components
 */
export const GET: RequestHandler = async () => {
	const {components} = await fetchComponentData()
	if (components) {
		const blocks = components.blocks.sort((a, b) => {
			return a < b ? -1 : b < a ? 1 : 0
		})
		const layouts = components.layouts.sort((a, b) => {
			return a < b ? -1 : b < a ? 1 : 0
		})
		return json({blocks, layouts, initial: DEFAULT_OPTIONS})
	}
	throw error(404, 'Not found')
}
