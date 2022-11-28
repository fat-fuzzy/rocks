import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/**
 * Load decisions
 * @param params Request parameters
 * @returns { decisions } frontmatter metadata and a Content svelte component that renders the contents of the file
 */
export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/decisions');
	if (response) {
		const decisions = await response.json();
		return {
			decisions
		};
	}
	throw error(404, 'Not found');
};
