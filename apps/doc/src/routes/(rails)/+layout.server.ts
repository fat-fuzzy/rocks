import ui from '@fat-fuzzy/ui'
import {buildNav} from '$data/nav'
const {DEFAULT_PREFERENCES, DEFAULT_REVEAL_STATE} = ui.constants

export const load = async ({locals, url}) => {
	let pageName = url.pathname.split('/')
	let sidebar

	if (pageName.length > 0 && pageName[1]) {
		let sidebar = buildNav(pageName[1])
		sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
		sidebar.actionPath = url.pathname
	}

	if (!sidebar) {
		sidebar = {layout: 'tgv'}
	}
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
