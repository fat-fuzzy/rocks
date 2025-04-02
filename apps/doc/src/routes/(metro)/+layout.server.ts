import {buildNav} from '$data/nav'

export const load = async ({locals, url}) => {
	let sidebar = buildNav(url.pathname.split('/')[1])
	let appContext = locals.appContext

	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname
	appContext.actionPath = url.pathname
	appContext = locals.appContext

	return {
		nav: locals.nav,
		sidebar,
		appContext,
	}
}
