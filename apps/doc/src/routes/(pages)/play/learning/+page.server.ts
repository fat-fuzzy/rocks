import {error} from '@sveltejs/kit'
import pages from '$data/pages'

const page = 'learning'

export const load = async ({params}) => {
	let content = await pages.fetchMarkdowns(page)

	if (!content?.length) {
		throw error(404, {message: 'Not found'})
	}
	content = content[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}
	const data = {
		content,
	}

	return data
}
