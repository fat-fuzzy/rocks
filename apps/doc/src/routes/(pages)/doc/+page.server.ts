import {error} from '@sveltejs/kit'

import images from '$data/images'
import pages from '$data/pages'
import uiActions from '$lib/forms/actions/ui-actions'
import {commonActions} from '$lib/forms/services/page-actions'
import type {NavItem} from '$types'
import decisions from '$data/decisions'
import usages from '$data/usages'
import {buildNav} from '$data/nav.js'

const page = 'doc'
const markdowns = await pages.fetchMarkdowns(page)

const decisionsMarkdowns = decisions.markdowns
	.filter(({meta}) => meta.status !== 'draft')
	.reverse()
const usagesMarkdowns = usages.markdowns
	.filter(({meta}) => meta.status !== 'draft')
	.reverse()
export const load = async ({parent}) => {
	let {sidebar, settings} = await parent()
	const imageSlug = '001-intro'

	if (!markdowns?.length) {
		throw error(404, {message: 'Not found'})
	}
	let content = markdowns[0]

	if (!content?.meta) {
		throw error(404, {message: 'Not found'})
	}

	try {
		const dayImageData = await images.getImageData('day', imageSlug)
		const nightImageData = await images.getImageData('night', imageSlug)

		if (!dayImageData?.json.sources || !nightImageData?.json.sources) {
			error(404, 'Not found')
		}
		return {
			images: {
				day: {
					src: `/${dayImageData.json.path}/${imageSlug}`,
					...dayImageData.json,
					sources: dayImageData.json.sources,
				},
				night: {
					src: `/${nightImageData.json.path}/${imageSlug}`,
					...nightImageData.json,
					sources: nightImageData.json.sources,
				},
			},
			sidebar,
			content,
			settings,
		}
	} catch (e) {
		error(500, 'Error loading image data')
	}
}

export const actions = {
	...commonActions,
	toggleUsage: async (event) => {
		const updated = await uiActions.handleToggleUsage(event)
		const linkTree = event.url.pathname.split('/').filter(Boolean)
		const revealKey = updated.key?.split('-').filter(Boolean)
		event.locals.sidebar = buildNav(linkTree[0])
		event.locals.sidebar.actionPath = event.url.pathname
		event.locals.sidebar.items =
			event.locals.sidebar?.items ?? event.locals.sidebar.items
		event.locals.sidebar.actionPath = event.url.pathname
		event.locals.sidebar.items[0].items =
			event.locals.sidebar.items[0].items.map((item) => {
				item.actionPath = event.url.pathname
				if (revealKey && item.slug === revealKey[2]) {
					item.reveal = updated.state.reveal
				} else {
					item.reveal = 'collapsed'
				}
				if (item.slug === 'usage') {
					item.items = usagesMarkdowns.map(({meta}) => meta)
				} else if (item.slug === 'decisions') {
					item.items = decisionsMarkdowns.map(({meta}) => meta)
				}
				return item
			})
	},
	toggleDecisions: async (event) => uiActions.handleToggleDecisions(event),
}
