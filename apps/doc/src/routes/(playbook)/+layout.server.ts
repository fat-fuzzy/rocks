import {buildNav} from '$data/nav'
let sidebar = buildNav('ui')

export const load = async ({locals, url}) => {
	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname

	return {
		sidebar,
	}
}
