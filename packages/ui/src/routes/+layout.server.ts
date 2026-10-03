import {pages} from '#config/navigation.js'
import {buildNav} from '#config/setup.js'

export const load = async ({url}) => {
	const pageName = url.pathname.split('/')
	let sidebar

	if (pageName.length > 0 && pageName[1]) {
		sidebar = buildNav(pageName[1], pages)
	}

	if (!sidebar) {
		sidebar = {layout: 'tgv', items: []}
	}

	const pageContext = {actionPath: url.pathname}

	return {
		sidebar,
		pageContext,
	}
}
