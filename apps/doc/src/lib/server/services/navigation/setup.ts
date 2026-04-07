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

const navBase = {
	id: 'sidebar',
	label: 'Secondary Navigation',
	breakpoint: 'sm',
	size: 'sm',
	variant: 'outline',
	background: 'primary',
	color: 'neutral',
	formaction: 'toggleSidebar',
	actionPath: '/',
	items: [] as NavItem[],
}

export function buildNav(page: string, pages: {[key: string]: NavItem}) {
	const nav = {...navBase, ...pages[page]}
	nav.label = pages[page].title ?? pages[page].label ?? page
	nav.items = [structuredClone(pages[page])]

	if (page === 'ui') {
		nav.items[0].items = buildUiNav(page, nav)
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

function searchLabelInItems(label: string, items?: NavItem[]) {
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

function getLabel(pathname: string, pages: {[key: string]: NavItem}) {
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

export function buildSubnav(
	path: string,
	markdowns: Markdown[],
	pages: {[key: string]: NavItem},
) {
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
				links.push({
					...meta,
					label: meta.title,
					actionPath: path,
				})
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

export function buildUiNav(page: string, nav: NavItem) {
	if (!nav.items) {
		return []
	}

	const navItems = (nav.items[0].items ?? []).map((item) => {
		const subnav = item.slug
		let subitems: NavItem[] = []
		if (subnav === 'tokens') {
			subitems = tokenNames.map((c) => ({
				slug: c,
				title: c,
				label: c,
				actionPath: `/${page}/${subnav}/${c}`,
			}))
		} else if (subnav === 'blocks') {
			subitems = blockNames.map((c) => ({
				slug: c,
				title: c,
				label: c,
				actionPath: `/${page}/${subnav}/${c}`,
			}))
		} else if (subnav === 'layouts') {
			subitems = layoutNames.map((c) => ({
				slug: c,
				title: c,
				label: c,
				actionPath: `/${page}/${subnav}/${c}`,
			}))
		} else if (subnav === 'recipes') {
			subitems = recipeNames.map((c) => ({
				slug: c,
				title: c,
				label: c,
				actionPath: `/${page}/${subnav}/${c}`,
			}))
		} else if (subnav === 'raw') {
			subitems = rawNames.map((c) => ({
				slug: c,
				title: c,
				label: c,
				actionPath: `/${page}/${subnav}/${c}`,
			}))
		}
		return structuredClone({...item, items: subitems})
	})

	return navItems
}
