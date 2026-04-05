import ui from '@fat-fuzzy/ui'
import {buildNav} from '$data/nav'
const {DEFAULT_PREFERENCES} = ui.constants

export const load = async ({locals, url}) => {
	const pageName = url.pathname.split('/')
	let sidebar

	if (pageName.length > 0 && pageName[1]) {
		sidebar = buildNav(pageName[1])
		sidebar.actionPath = url.pathname
	}

	if (!sidebar) {
		sidebar = {layout: 'tgv', items: []}
	}

	const appContext = locals.appContext ?? DEFAULT_PREFERENCES
	const pageContext = locals.pageContext ?? {}
	appContext.actionPath = url.pathname
	pageContext.actionPath = url.pathname

	return {
		sidebar,
		pageContext,
		appContext,
	}
}
