import data from '$data/decisions';
import type { PageServerLoad } from './$types';

const { decisions } = data;

export const load: PageServerLoad = () => {
	return { decisions };
};
