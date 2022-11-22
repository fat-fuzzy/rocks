import { decisions } from '../../data/decisions/decisions.md';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		decisions
	};
};
