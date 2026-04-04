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

const pages: {[key: string]: NavItem} = {
	blog: {
		slug: 'blog',
		label: 'Blog',
		title: 'Content',
		asset: 'pencil',
		assetType: 'emoji',
		layout: 'metro',
		items: [],
		actionPath: '/blog',
	},
	about: {
		slug: 'about',
		label: 'About',
		title: 'Doc',
		asset: 'doc',
		assetType: 'emoji',
		layout: 'voyager',
		actionPath: '/about',
		items: [
			{
				slug: 'usage',
				title: 'Usage',
				label: 'Usage',
				asset: 'usage',
				assetType: 'emoji',
				actionPath: '/about/usage',
				items: [],
			},
			{
				slug: 'decisions',
				title: 'Decisions',
				label: 'Decisions',
				asset: 'decisions',
				assetType: 'emoji',
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
		actionPath: '/play',
		items: [
			{
				slug: 'projects',
				title: 'Projects',
				label: 'Projects',
				asset: 'projects',
				assetType: 'emoji',
				layout: 'tram',
				actionPath: '/play/projects',
				items: [],
			},
			{
				slug: 'learning',
				title: 'Learning',
				label: 'Learning',
				asset: 'learning',
				layout: 'tram',
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
	nav.label = pages[page].title ?? pages[page].label ?? page
	nav.items = [structuredClone(pages[page])]

	if (page === 'ui') {
		nav.items[0].items = (nav.items[0].items ?? []).map((item) => {
			const subnav = item.slug
			if (subnav === 'tokens') {
				item.items = tokenNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
					actionPath: `/${page}/${subnav}/${c}`,
				}))
			} else if (subnav === 'blocks') {
				item.items = blockNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
					actionPath: `/${page}/${subnav}/${c}`,
				}))
			} else if (subnav === 'layouts') {
				item.items = layoutNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
					actionPath: `/${page}/${subnav}/${c}`,
				}))
			} else if (subnav === 'recipes') {
				item.items = recipeNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
					actionPath: `/${page}/${subnav}/${c}`,
				}))
			} else if (subnav === 'raw') {
				item.items = rawNames.map((c) => ({
					slug: c,
					title: c,
					label: c,
					actionPath: `/${page}/${subnav}/${c}`,
				}))
			}
			return item
		})
	}

	return nav
}

export function buildNavItems(markdowns: Markdown[], parent?: NavItem) {
	return markdowns.map(({meta}) => ({
		...meta,
		label: meta.title,
		actionPath: parent?.actionPath ? `${parent.actionPath}/${meta.slug}` : '/',
	}))
}

export function searchLabelInItems(label: string, items?: NavItem[]) {
	if (!items) {
		return
	}
	for (let i = 0; i++; i < items.length) {
		const itemLabel = items[i].label
		if (itemLabel === label) {
			return itemLabel
		} else if (items[i].items !== undefined) {
			return searchLabelInItems(label, items[i].items)
		}
	}
}

export function getLabel(pathname: string, pages: {[key: string]: NavItem}) {
	const label = pathname
	const pageEntries = Object.entries(pages)
	for (const entry of pageEntries) {
		const items = entry[1].items || []
		if (entry[0] === label) {
			return entry[1].label
		} else if (items) {
			const itemLabel = searchLabelInItems(label, items)
			if (!itemLabel) {
				return label
			}
			return itemLabel
		}
	}
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
									actionPath: `${path}/${item.meta.slug}`,
								}
							}
						}
					})
					.filter((item) => item !== undefined) as NavItem[]

				meta.title = meta.series.title
				links.push({...meta, label: meta.title})
			}
		} else {
			// Not a series, just add the link
			const link: NavItem = {
				slug: meta.slug,
				title: meta.title,
				label: getLabel(meta.slug, pages) || meta.slug,
				actionPath: `${path}/${meta.slug}`,
			}
			links.push(link)
		}
		return links
	}, [])

	return subnav
}
