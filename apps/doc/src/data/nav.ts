import type {NavItem} from '$types'
import ui from '@fat-fuzzy/ui'

const {DEFAULT_SIDEBAR_REVEAL_STATE} = ui.constants

export const links = [
	{slug: 'doc', title: 'Doc', layout: 'sidebar'},
	{slug: 'ui', title: 'UI', layout: 'sidebar'},
	{slug: 'blog', title: 'Blog', layout: 'sidebar'},
	{slug: 'play', title: 'Play', layout: 'sidebar'},
]

const navBase = {
	id: 'sidebar',
	title: 'content',
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
		title: 'Blog',
		items: [],
	},
	doc: {
		slug: 'doc',
		title: 'Doc',
		items: [
			{
				slug: 'usage',
				title: 'Usage',
				asset: 'usage',
				formaction: 'toggleUsage',
				items: [],
			},
			{
				slug: 'decisions',
				title: 'Decisions',
				asset: 'decisions',
				formaction: 'toggleDecisions',
				items: [],
			},
		],
	},
	play: {
		slug: 'play',
		title: 'Play',
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
		title: 'Library',
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
		],
	},
}

export function buildNav(page: string) {
	let nav = {...navBase}
	nav.title = `${page} menu`
	nav.items = [pages[page]]

	return nav
}
