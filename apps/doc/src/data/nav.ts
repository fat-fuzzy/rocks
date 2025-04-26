import type {NavItem} from '$types'
import ui from '@fat-fuzzy/ui'

// TODO: move to utils / clean
function sortAsc(a, b) {
	return a < b ? -1 : b < a ? 1 : 0
}
const tokenNames = Object.keys(ui.tokens).sort(sortAsc)
const blockNames = Object.keys(ui.blocks).sort(sortAsc)
const layoutNames = Object.keys(ui.layouts).sort(sortAsc)
const recipeNames = Object.keys(ui.recipes).sort(sortAsc)
const rawNames = Object.keys(ui.raw).sort(sortAsc)

const {DEFAULT_SIDEBAR_REVEAL_STATE} = ui.constants

export const links = [
	{slug: 'doc', title: 'Doc', layout: 'sidebar'},
	{slug: 'ui', title: 'UI', layout: 'sidebar'},
	{slug: 'blog', title: 'Blog', layout: 'sidebar'},
	{slug: 'play', title: 'Play', layout: 'sidebar'},
]

const navBase = {
	id: 'sidebar',
	label: 'content',
	reveal: DEFAULT_SIDEBAR_REVEAL_STATE.reveal,
	breakpoint: 'sm',
	size: 'sm',
	variant: 'outline',
	color: 'primary',
	position: 'fixed',
	place: 'left',
	formaction: 'toggleSidebar',
	actionPath: '/',
	items: [] as NavItem[],
}

export const pages: {[key: string]: NavItem} = {
	blog: {
		slug: 'blog',
		title: 'Posts',
		asset: 'pencil',
		layout: 'metro',
		items: [],
	},
	doc: {
		slug: 'doc',
		title: 'Doc',
		label: 'Doc',
		asset: 'pencil',
		layout: 'voyager',
		items: [
			{
				slug: 'usage',
				title: 'Usage',
				asset: 'usage',
				layout: 'metro',
				formaction: 'toggleUsage',
				items: [],
			},
			{
				slug: 'decisions',
				title: 'Decisions',
				asset: 'decisions',
				layout: 'metro',
				formaction: 'toggleDecisions',
				items: [],
			},
		],
	},
	play: {
		slug: 'play',
		title: 'Sketches',
		asset: 'rainbow',
		layout: 'metro',
		items: [
			{
				slug: 'projects',
				title: 'Projects',
				asset: 'projects',
				formaction: 'toggleProjects',
				items: [],
			},
			{
				slug: 'learning',
				title: 'Learning',
				asset: 'learning',
				formaction: 'toggleLearning',
				items: [],
			},
		],
	},
	ui: {
		slug: 'ui', // root path of the Playbook
		title: 'UI Library',
		asset: 'playbook',
		label: 'Playbook',
		layout: 'voyager',
		items: [
			{
				slug: 'tokens',
				title: 'Tokens',
				asset: 'tokens',
				formaction: 'toggleTokens',
				items: [],
			},
			{
				slug: 'blocks',
				title: 'Blocks',
				asset: 'blocks',
				formaction: 'toggleBlocks',
				items: [],
			},
			{
				slug: 'layouts',
				title: 'Layouts',
				asset: 'layouts',
				formaction: 'toggleLayouts',
				items: [],
			},
			{
				slug: 'recipes',
				title: 'Recipes',
				asset: 'recipes',
				formaction: 'toggleRecipes',
				items: [],
			},
			{
				slug: 'raw',
				title: 'Raw',
				asset: 'raw',
				formaction: 'toggleRaw',
				layout: 'voyager',
				items: [],
			},
		],
	},
}

export function buildNav(page: string) {
	let nav = {...navBase, ...pages[page]}
	nav.label = pages[page].label ?? page
	nav.items = [pages[page]]

	if (page === 'ui') {
		nav.items[0].items = (nav.items[0].items ?? []).map((item) => {
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
			} else if (item.slug === 'raw') {
				item.items = rawNames.map((c) => ({
					slug: c,
					title: c,
				}))
			}
			return item
		})
	}

	return nav
}
