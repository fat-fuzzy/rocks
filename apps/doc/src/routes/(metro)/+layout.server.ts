import {buildNav} from '$data/nav'

export const load = async ({locals, url}) => {
	let sidebar = buildNav(url.pathname.split('/')[1])
	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname

	let pageContext = locals.pageContext
	pageContext.actionPath = url.pathname

	return {
		sidebar,
		pageContext,
	}
}
