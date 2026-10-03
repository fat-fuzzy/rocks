import {error} from '@sveltejs/kit'
import {commonActions} from '#lib/server/actions/page-actions.js'

export const load = async () => {
	error(404, 'Not found')
}

export const actions = commonActions
