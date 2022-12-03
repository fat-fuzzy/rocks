import type { LayoutLoad } from './$types';
import * as ui from '@fat-fuzzy/ui';

export const load: LayoutLoad = async ({ params, fetch }) => {
	try {
		const response = await fetch('/api/ui');
		const components = await response.json();
		const title = `${params.category.charAt(0).toUpperCase()}${params.category.slice(1)}`;
		if (components) {
			return { components, title, slug: params.category };
		}
	} catch (error) {
		console.log(error);
		// TODO: proper error handling
	}
};
