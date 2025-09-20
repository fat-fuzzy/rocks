import {error} from '@sveltejs/kit'
import talks from '$data/talks'
import {commonActions} from '$lib/server/actions/page-actions'

export const load = async ({params}) => {
	let markdowns = await talks.fetchMarkdowns(params.talk)

	if (!markdowns?.length) {
		error(404, {message: 'Not found'})
	}

	const content = markdowns[0]

	if (!content?.meta) {
		error(404, {message: 'Not found'})
	}

	return {
		content,
	}
}

export const actions = {
	toggleNav: commonActions.toggleNav,
	toggleAppContext: commonActions.toggleAppContext,
	updateSettings: commonActions.updateSettings,
}
