import ui from '@fat-fuzzy/ui'
import {buildNav} from '$data/nav'

const {DEFAULT_APP_SETTINGS} = ui.constants
const {DEFAULT_REVEAL_STATE} = ui.constants

export const load = async ({locals, url}) => {
	let sidebar = buildNav(url.pathname.split('/')[1])
	let settings = locals.settings ?? DEFAULT_APP_SETTINGS
	let context = locals.context ?? DEFAULT_REVEAL_STATE

	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname

	return {
		sidebar,
		settings,
		context,
	}
}
