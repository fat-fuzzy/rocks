import data from '$data/decisions';
import type { LayoutLoad } from './$types';

const { decisions } = data;

export const load: LayoutLoad = () => {
	return { decisions };
};
