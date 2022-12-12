import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/ui');
		const components = await response.json();

		return {
			components
		};
	} catch (error) {
		console.log(error);
		// TODO: proper error handling
	}
};
