import {error, redirect} from '@sveltejs/kit'
import ui from '@fat-fuzzy/ui'
import assets from '$data/ui'
import pages from '$data/pages'
import {buildNav} from '$data/nav'
import uiStateService from '$lib/forms/services/ui-state'

const page = 'ui'
let markdowns = assets.markdowns
const {APP_PREFIX} = ui.constants

const revealForms = [
	// ui page forms
	'tokens',
	'blocks',
	'layouts',
	'recipes',
]

enum FormsEnum {
	// ui page forms
	tokens = 'tokens',
	blocks = 'blocks',
	layouts = 'layouts',
	recipes = 'recipes',
	dsState = 'dsState',
	dsStyles = 'dsStyles',
	currentTabs = 'currentTabs',
}

// TODO: move to utils / clean
function sortAsc(a, b) {
	return a < b ? -1 : b < a ? 1 : 0
}

const tokenNames = Object.keys(ui.tokens).sort(sortAsc)
const blockNames = Object.keys(ui.blocks).sort(sortAsc)
const layoutNames = Object.keys(ui.layouts).sort(sortAsc)
const recipeNames = Object.keys(ui.recipes).sort(sortAsc)

export const load = async ({locals, cookies, params, url}) => {
	const dsState = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-ui-state`,
	})

	const dsStyles = uiStateService.getUiState({
		cookies,
		key: `${APP_PREFIX}-ui-styles`,
	})

	const appLocalsMap = revealForms.map((form) => ({
		[form]: uiStateService.getUiState({
			cookies,
			key: `${APP_PREFIX}-reveal-${form}`,
		}),
	}))

	const appLocals = appLocalsMap.reduce((acc, curr) => {
		return {...acc, ...curr}
	}, {})

	// UI sidebar nav
	locals.navTokens = appLocals[FormsEnum.tokens]
	locals.navBlocks = appLocals[FormsEnum.blocks]
	locals.navLayouts = appLocals[FormsEnum.layouts]
	locals.navRecipes = appLocals[FormsEnum.recipes]

	// UI state and styles
	locals.dsState = dsState
	locals.dsStyles = dsStyles

	let sidebar = buildNav('ui')
	sidebar.reveal = locals.sidebar.reveal ?? sidebar.reveal
	sidebar.actionPath = url.pathname
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
	let content = null

	let component = params.component
	let category = params.category

	let slug = component ? component : category

	if (!slug) {
		content = await pages.fetchMarkdowns(page)
		if (!content?.length) {
			throw error(404, {message: 'Not found'})
		} else {
			content = content[0]
		}
	} else if (category === 'graphics') {
		redirect(301, '/doc/usage/sketch')
	} else if (slug === component && category) {
		let categoryMarkdowns = markdowns[category]
		if (!categoryMarkdowns?.length) {
			throw error(404, {message: 'Not found'})
		} else {
			content = categoryMarkdowns.find(
				({meta}) => meta.slug === slug && meta.status !== 'draft',
			)
			if (!content?.meta) {
				throw error(404, {message: 'Not found'})
			}
		}
	} else if (slug === category) {
		if (!markdowns[category]) {
			throw error(404, {message: 'Not found'})
		}
		content = markdowns[category].find(
			({meta}) => meta.slug === category && meta.status !== 'draft',
		)
		if (!content?.meta) {
			throw error(404, {message: 'Not found'})
		}
	}

	return {
		sidebar,
		styles: locals.dsStyles,
		context: locals.dsContext,
		ui: locals.dsState,
		markdowns,
		content,
	}
}
