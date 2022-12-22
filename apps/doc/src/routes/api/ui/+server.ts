import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { fetchComponentData } from '$utils/stories';

/**
 * API Endpoint /api/ui
 * @returns array of ui library components
 */
export const GET: RequestHandler = async () => {
	const { components } = await fetchComponentData();
	if (components) {
		const blocks = components.blocks.sort((a, b) => {
			return a < b ? -1 : b < a ? 1 : 0;
		});
		const layouts = components.layouts.sort((a, b) => {
			return a < b ? -1 : b < a ? 1 : 0;
		});
		return json({ blocks, layouts });
	}
	throw error(404, 'Not found');
};
