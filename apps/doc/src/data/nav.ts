import type {NavItem} from '$types'
import ui from '@fat-fuzzy/ui'

// TODO: move to utils / clean
function sortAsc(a: string | number, b: string | number) {
	return a < b ? -1 : b < a ? 1 : 0
}
const tokenNames = Object.keys(ui.tokens).sort(sortAsc)
const blockNames = Object.keys(ui.blocks).sort(sortAsc)
const layoutNames = Object.keys(ui.layouts).sort(sortAsc)
const recipeNames = Object.keys(ui.recipes).sort(sortAsc)
const rawNames = Object.keys(ui.raw).sort(sortAsc)

const {DEFAULT_SIDEBAR_REVEAL_STATE} = ui.constants

export const links = [
	{slug: 'about', title: 'About', layout: 'sidebar'},
	{slug: 'ui', title: 'UI', layout: 'sidebar'},
	{slug: 'blog', title: 'Blog', layout: 'sidebar'},
	{slug: 'play', title: 'Play', layout: 'sidebar'},
]

export const linksSocials = [
	{
		id: 'link-github',
		title: 'GitHub',
		url: 'https://github.com/fat-fuzzy/rocks',
		asset: 'svg:github',
		shape: 'round',
		size: 'md',
		color: 'primary',
	},
]

const navBase = {
	id: 'sidebar',
	label: 'Secondary Navigation',
	reveal: DEFAULT_SIDEBAR_REVEAL_STATE.reveal,
	breakpoint: 'sm',
	size: 'sm',
	variant: 'outline',
	color: 'primary',
	formaction: 'toggleSidebar',
	actionPath: '/',
	items: [] as NavItem[],
}

export const pages: {[key: string]: NavItem} = {
	blog: {
		slug: 'blog',
		label: 'Blog',
		title: 'Posts',
		asset: 'pencil',
		layout: 'metro',
		items: [],
	},
	about: {
		slug: 'about',
		label: 'About',
		title: 'Doc',
		asset: 'doc',
		layout: 'voyager',
		items: [
			{
				slug: 'usage',
				title: 'Usage',
				asset: 'usage',
				formaction: 'toggleUsage',
				actionPath: '/about/usage',
				items: [],
			},
			{
				slug: 'decisions',
				title: 'Decisions',
				asset: 'decisions',
				formaction: 'toggleDecisions',
				actionPath: '/about/decisions',
				items: [],
			},
		],
	},
	play: {
		slug: 'play',
		label: 'Play',
		title: 'Sketches',
		asset: 'rainbow',
		layout: 'metro',
		items: [
			{
				slug: 'projects',
				title: 'Projects',
				asset: 'projects',
				formaction: 'toggleProjects',
				actionPath: '/play/projects',
				items: [],
			},
			{
				slug: 'learning',
				title: 'Learning',
				asset: 'learning',
				formaction: 'toggleLearning',
				actionPath: '/play/learning',
				items: [],
			},
		],
	},
	ui: {
		slug: 'ui', // root path of the Playbook
		title: 'UI Library',
		asset: 'playbook',
		label: 'UI',
		layout: 'voyager',
		items: [
			{
				slug: 'tokens',
				title: 'Tokens',
				asset: 'tokens',
				layout: 'tram',
				formaction: 'toggleTokens',
				actionPath: '/ui/tokens',
				items: [],
			},
			{
				slug: 'blocks',
				title: 'Blocks',
				asset: 'blocks',
				layout: 'tram',
				formaction: 'toggleBlocks',
				actionPath: '/ui/blocks',
				items: [],
			},
			{
				slug: 'layouts',
				title: 'Layouts',
				asset: 'layouts',
				layout: 'tram',
				formaction: 'toggleLayouts',
				actionPath: '/ui/layouts',
				items: [],
			},
			{
				slug: 'recipes',
				title: 'Recipes',
				asset: 'recipes',
				layout: 'tram',
				formaction: 'toggleRecipes',
				actionPath: '/ui/recipes',
				items: [],
			},
			{
				slug: 'raw',
				title: 'Raw',
				asset: 'raw',
				layout: 'tram',
				formaction: 'toggleRaw',
				actionPath: '/ui/raw',
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
