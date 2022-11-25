import type { RequestHandler } from './$types';
import data from '$data/decisions';

const { decisions } = data;

export const GET: RequestHandler = async ({ url }) => {
	const content = await import(url);
	return {
		decisions: decisions.map((d) => {
			return {
				...d,
				content: content.default
			};
		})
	};
};
