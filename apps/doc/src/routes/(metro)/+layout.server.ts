import {buildNav} from '$data/nav'

export const load = async ({locals, url}) => {
	let sidebar = buildNav(url.pathname.split('/')[1])
	let context = locals.context

	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname
	context.actionPath = url.pathname

	return {
		nav: locals.nav,
		sidebar,
		context: context,
	}
}
