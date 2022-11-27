import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { fetchMarkdownData } from '$utils';

/**
 * API Endpoint /api/decisions
 * @returns array of decisions
 */
export const GET: RequestHandler = async () => {
	try {
		const allPosts = await fetchMarkdownData();
		const sortedPosts = allPosts.sort((a, b) => {
			return a.meta.id < b.meta.id ? -1 : b.meta.id < a.meta.id ? 1 : 0;
		});
		return json(sortedPosts);
	} catch (error) {
		console.log(error);
		// TODO: proper error handling
	}
};
