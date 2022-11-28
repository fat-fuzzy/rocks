import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const DATA_PATH = '../../../data/decisions/';
/**
 * Load data from markdown file based on route parameters
 * @param params Request parameters
 * @returns { title, year, Content } frontmatter metadata and a Content svelte component that renders the contents of the file
 */
export const load: PageLoad = async ({ params }) => {
	const markdown = await import(`${DATA_PATH}${params.id}.md`);
	if (markdown) {
		const { title, year } = markdown.metadata;
		const Content = markdown.default;

		return {
			title,
			year,
			Content // capitalize this to use component <Content /> in +page.svelte
		};
	}
	throw error(404, 'Not found');
};
