import {error} from '@sveltejs/kit'
import {commonActions} from '$lib/forms/actions/page-actions'

export const load = async () => {
	error(404, 'Not found')
}

export const actions = {
	toggleNav: commonActions.toggleNav,
	toggleSettings: commonActions.toggleSettings,
	updateSettings: commonActions.updateSettings,
}
