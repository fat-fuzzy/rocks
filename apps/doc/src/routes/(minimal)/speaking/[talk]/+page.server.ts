import {error} from '@sveltejs/kit'
import {commonActions} from '$lib/server/actions/page-actions'

export const load = async ({parent, params}) => {
	const {talks} = await parent()

	const content = talks.find((p) => p.meta.slug === params.talk)

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	return {
		content,
	}
}

export const actions = {
	toggleNav: commonActions.toggleNav,
	toggleSidebar: commonActions.toggleSidebar,
	toggleAppContext: commonActions.toggleAppContext,
	updateSettings: commonActions.updateSettings,
}
