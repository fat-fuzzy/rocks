import {error} from '@sveltejs/kit'
import pages from '$data/pages'
import {commonActions} from '$lib/server/actions/page-actions'

const page = 'speaking'
const markdowns = await pages.fetchMarkdowns(page)

export const load = async ({parent}) => {
	if (!markdowns?.length) {
		error(404, {message: 'Not found'})
	}

	const content = markdowns[0]

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	const {sidebar} = await parent()

	return {
		sidebar,
		content,
	}
}

export const actions = {
	toggleNav: commonActions.toggleNav,
	toggleSidebar: commonActions.toggleSidebar,
	toggleAppContext: commonActions.toggleAppContext,
	updateSettings: commonActions.updateSettings,
	saveCookiePreferences: commonActions.saveCookiePreferences,
}
