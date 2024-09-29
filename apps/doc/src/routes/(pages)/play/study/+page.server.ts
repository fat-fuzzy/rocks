import {error} from '@sveltejs/kit'
import {dev} from '$app/environment'
import pages from '$data/pages'

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true

export const ssr = true

const page = 'study'

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
