import {pages} from '$config/navigation'
import {buildNav} from '$lib/server/services/navigation/setup'

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
