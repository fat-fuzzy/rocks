import ui from '@fat-fuzzy/ui'
import {buildNav} from '$data/nav'

const {DEFAULT_PREFERENCES} = ui.constants

export const load = async ({locals, url}) => {
	let sidebar = buildNav(url.pathname.split('/')[1])
	let context = locals.context ?? DEFAULT_PREFERENCES

	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname

	return {
		sidebar,
		context,
	}
}
