import {pages} from '#config/navigation.js'
import {buildNav} from '#lib/server/services/navigation/setup.js'

export const load = async ({locals, url}) => {
	const pageName = url.pathname.split('/')
	let sidebar

	if (pageName.length > 0 && pageName[1]) {
		sidebar = buildNav(pageName[1], pages)
		sidebar.actionPath = url.pathname
	}

	if (!sidebar) {
		sidebar = {layout: 'tgv', items: []}
	}

	const pageContext = locals.pageContext ?? {}

	pageContext.actionPath = url.pathname

	return {
		sidebar,
		pageContext,
	}
}
