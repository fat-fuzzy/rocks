import ui from '@fat-fuzzy/ui'
import {buildNav} from '$data/nav'

const {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} = ui.constants
// TODO: move to utils / clean
function sortAsc(a, b) {
	return a < b ? -1 : b < a ? 1 : 0
}

const tokenNames = Object.keys(ui.tokens).sort(sortAsc)
const blockNames = Object.keys(ui.blocks).sort(sortAsc)
const layoutNames = Object.keys(ui.layouts).sort(sortAsc)
const recipeNames = Object.keys(ui.recipes).sort(sortAsc)

let sidebar = buildNav('ui')
sidebar.items[0].items = (sidebar.items[0].items ?? []).map((item) => {
	if (item.slug === 'tokens') {
		item.items = tokenNames.map((c) => ({
			slug: c,
			title: c,
		}))
	} else if (item.slug === 'blocks') {
		item.items = blockNames.map((c) => ({
			slug: c,
			title: c,
		}))
	} else if (item.slug === 'layouts') {
		item.items = layoutNames.map((c) => ({
			slug: c,
			title: c,
		}))
	} else if (item.slug === 'recipes') {
		item.items = recipeNames.map((c) => ({
			slug: c,
			title: c,
		}))
	}
	return item
})

export const load = async ({locals, url}) => {
	let settings = locals.settings ?? DEFAULT_APP_SETTINGS

	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname

	return {
		sidebar,
		settings,
	}
}
