import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import * as ui from '@fat-fuzzy/ui';
/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, Content } frontmatter metadata and a Content svelte component that renders the contents of the file
 */
export const load: PageLoad = async ({ params }) => {
	const category = ui[params.category];
	const title = `${params.component.charAt(0).toUpperCase()}${params.component.slice(1)}`;
	const Component = category[title];
	if (Component) {
		return {
			category: params.category,
			slug: params.component,
			title,
			Component // capitalize this to use component <Content /> in +page.svelte
		};
	}
	throw error(404, 'Not found');
};
