import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { fetchDecisionsFileData } from '$utils/markdown';

/**
 * API Endpoint /api/decisions
 * @returns array of decisions
 */
export const GET: RequestHandler = async () => {
	const allPosts = await fetchDecisionsFileData();
	if (allPosts) {
		const sortedPosts = allPosts.sort((a, b) => {
			return a.meta.id < b.meta.id ? -1 : b.meta.id < a.meta.id ? 1 : 0;
		});
		return json(sortedPosts);
	}
	throw error(404, 'Not found');
};
