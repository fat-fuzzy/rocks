import type {NavItem, Markdown} from '$types'
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
	{slug: 'about', label: 'About', layout: 'sidebar'},
	{slug: 'ui', label: 'UI', layout: 'sidebar'},
	{slug: 'blog', label: 'Blog', layout: 'sidebar'},
	{slug: 'play', label: 'Play', layout: 'sidebar'},
]

export const linksSocials = [
	{
		id: 'link-github',
		label: 'GitHub',
		url: 'https://github.com/fat-fuzzy/rocks',
		asset: 'github',
		assetType: 'svg',
		shape: 'round',
		size: 'sm',
		color: 'primary',
	},
	{
		id: 'link-rss',
		label: 'RSS',
		url: 'https://rocks.pages.dev/blog/rss.xml',
		asset: 'rss',
		assetType: 'svg',
		shape: 'square',
		size: 'sm',
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
		title: 'Blog',
		label: 'Blog',
		asset: 'pencil',
		assetType: 'emoji',
		layout: 'metro',
		items: [],
	},
	about: {
		slug: 'about',
		label: 'About',
		title: 'Doc',
		asset: 'doc',
		assetType: 'emoji',
		layout: 'voyager',
		items: [
			{
				slug: 'usage',
				title: 'Usage',
				label: 'Usage',
				asset: 'usage',
				assetType: 'emoji',
				formaction: 'toggleUsage',
				actionPath: '/about/usage',
				items: [],
			},
			{
				slug: 'decisions',
				title: 'Decisions',
				label: 'Decisions',
				asset: 'decisions',
				assetType: 'emoji',
				formaction: 'toggleDecisions',
				actionPath: '/about/decisions',
				items: [],
			},
			{
				slug: 'speaking',
				title: 'Speaking',
				label: 'Speaking',
				asset: 'speaking',
				assetType: 'emoji',
				layout: 'steam',
				formaction: 'toggleSpeaking',
				actionPath: '/about/speaking',
				items: [],
			},
		],
	},
	play: {
		slug: 'play',
		label: 'Play',
		title: 'Sketches',
		asset: 'rainbow',
		assetType: 'emoji',
		layout: 'metro',
		items: [
			{
				slug: 'projects',
				title: 'Projects',
				label: 'Projects',
				asset: 'projects',
				assetType: 'emoji',
				formaction: 'toggleProjects',
				actionPath: '/play/projects',
				items: [],
			},
			{
				slug: 'learning',
				title: 'Learning',
				label: 'Learning',
				asset: 'learning',
				assetType: 'emoji',
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
		assetType: 'emoji',
		label: 'UI',
		layout: 'voyager',
		items: [
			{
				slug: 'tokens',
				title: 'Tokens',
				label: 'Tokens',
				asset: 'tokens',
				assetType: 'emoji',
				layout: 'tram',
				formaction: 'toggleTokens',
				actionPath: '/ui/tokens',
				items: [],
			},
			{
				slug: 'blocks',
				title: 'Blocks',
				label: 'Blocks',
				asset: 'blocks',
				assetType: 'emoji',
				layout: 'tram',
				formaction: 'toggleBlocks',
				actionPath: '/ui/blocks',
				items: [],
			},
			{
				slug: 'layouts',
				title: 'Layouts',
				label: 'Layouts',
				asset: 'layouts',
				assetType: 'emoji',
				layout: 'tram',
				formaction: 'toggleLayouts',
				actionPath: '/ui/layouts',
				items: [],
			},
			{
				slug: 'recipes',
				title: 'Recipes',
				label: 'Recipes',
				asset: 'recipes',
				assetType: 'emoji',
				layout: 'tram',
				formaction: 'toggleRecipes',
				actionPath: '/ui/recipes',
				items: [],
			},
			{
				slug: 'raw',
				title: 'Raw',
				label: 'Raw',
				asset: 'raw',
				assetType: 'emoji',
				layout: 'tram',
				formaction: 'toggleRaw',
				actionPath: '/ui/raw',
				items: [],
			},
		],
	},
	media: {
		slug: 'media',
		label: 'Media',
		title: 'Collections',
		asset: 'pencil',
		assetType: 'emoji',
		layout: 'sidebar',
		items: [],
	},
}

export function buildNav(page: string) {
	const nav = {...navBase, ...pages[page]}
	nav.label = pages[page].label ?? page
	nav.items = [pages[page]]

	if (page === 'ui') {
		nav.items[0].items = (nav.items[0].items ?? []).map((item) => {
			if (item.slug === 'tokens') {
				item.items = tokenNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
				}))
			} else if (item.slug === 'blocks') {
				item.items = blockNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
				}))
			} else if (item.slug === 'layouts') {
				item.items = layoutNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
				}))
			} else if (item.slug === 'recipes') {
				item.items = recipeNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
				}))
			} else if (item.slug === 'raw') {
				item.items = rawNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
				}))
			}
			return item
		})
	}

	return nav
}

export function buildSubnav(path: string, markdowns: Markdown[]) {
	const subnav: NavItem[] = markdowns.reduce((links: NavItem[], {meta}) => {
		if (meta.series) {
			if (meta.index === 0) {
				// First item in series, build the series links from metadata
				meta.items = meta.series.items
					.map((id: string, index: number) => {
						if (index > 0) {
							const item = markdowns.find((p) => p.meta.id === id)
							if (item) {
								return {
									slug: item.meta.slug,
									talk: item.meta.talk,
									title: item.meta.series?.title,
									label: item.meta.series?.title,
									itemPath: `${path}/${meta.talk}`,
								}
							}
						}
					})
					.filter((item) => item !== undefined) as NavItem[]

				meta.title = meta.series.title
				links.push(meta)
			}
		} else {
			// Not a series, just add the link
			const link = {
				slug: meta.slug,
				talk: meta.talk,
				title: meta.title,
				itemPath: `${path}/${meta.talk}`,
			}
			links.push(link)
		}
		return links
	}, [])

	return subnav
}
