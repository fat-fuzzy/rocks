import {error} from '@sveltejs/kit'
import {commonActions} from '$lib/server/actions/page-actions'

export const load = async () => {
	error(404, 'Not found')
}

export const actions = {
	toggleNav: commonActions.toggleNav,
	toggleSidebar: commonActions.toggleSidebar,
	toggleAppContext: commonActions.toggleAppContext,
	updateSettings: commonActions.updateSettings,
}
