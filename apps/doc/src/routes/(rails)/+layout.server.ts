import ui from '@fat-fuzzy/ui'
import {buildNav} from '$data/nav'
const {DEFAULT_PREFERENCES, DEFAULT_REVEAL_STATE} = ui.constants

export const load = async ({locals, url}) => {
	let sidebar = buildNav(url.pathname.split('/')[1])
	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname
	let appContext = locals.appContext ?? {
		...DEFAULT_REVEAL_STATE,
		...DEFAULT_PREFERENCES,
	}
	let pageContext = locals.pageContext
	pageContext.actionPath = url.pathname

	return {
		sidebar,
		pageContext,
		appContext,
	}
}
