import type {NavItem, UiColor, UiShape, UiSize, UiVariant} from '@fat-fuzzy/ui'
import type {SeedSection} from '$types'

export const links = [
	{
		slug: 'chlorophyll',
		title: 'Chlorophyll',
		label: 'Chlorophyll',
		layout: 'metro',
	},
]

export const linksSocials = [
	{
		id: 'link-github',
		title: 'GitHub',
		url: 'https://github.com/fat-fuzzy/rocks',
		asset: 'svg:github',
		shape: 'round' as UiShape,
		size: 'xs' as UiSize,
		color: 'primary' as UiColor,
	},
	{
		id: 'blog',
		title: 'Blog',
		url: 'https://rocks.pages.dev/blog',
		asset: 'svg:memo',
		shape: 'square' as UiShape,
		size: 'sm' as UiSize,
		color: 'primary' as UiColor,
	},
]

const navBase = {
	id: 'sidebar',
	label: 'Main Navigation',
	title: '',
	breakpoint: 'sm' as UiSize,
	size: 'sm' as UiSize,
	variant: 'outline' as UiVariant,
	color: 'neutral' as UiColor,
	pathname: '',
	background: undefined,
	items: [] as NavItem[],
}

export const cta: {[key: string]: NavItem} = {
	phloem: {
		slug: 'phloem',
		label: 'Phloem',
		title: 'Phloem',
		layout: 'tram',
		asset: 'wave',
		actionPath: '/phloem',
		items: [
			{
				slug: 'write',
				title: 'Write',
				label: 'Write',
				actionPath: '/phloem/write',
			},
			{
				slug: 'reflect',
				title: 'Reflect',
				label: 'Reflect',
				actionPath: '/phloem/reflect',
			},
			{
				slug: 'explore',
				title: 'Explore',
				label: 'Explore',
				actionPath: '/phloem/explore',
			},
		],
	},
	chlorophyll: {
		slug: 'chlorophyll',
		label: 'Chlorophyll',
		title: 'Chlorophyll',
		layout: 'tram',
		asset: 'blocks',
		actionPath: '/chlorophyll',
		color: 'accent' as UiColor,
		items: [
			{
				slug: 'edit',
				title: 'Edit',
				label: 'Edit',
				actionPath: '/chlorophyll/edit',
			},
			{
				slug: 'build',
				title: 'Build',
				label: 'Build',
				actionPath: '/chlorophyll/build',
			},
			{
				slug: 'compare',
				title: 'Compare',
				label: 'Compare',
				actionPath: '/chlorophyll/compare',
			},
			{
				slug: 'print',
				title: 'Print',
				label: 'Print',
				actionPath: '/chlorophyll/print',
			},
		],
	},
	mycelium: {
		slug: 'mycelium',
		label: 'Mycelium',
		title: 'Mycelium',
		layout: 'tram',
		asset: 'log',
		actionPath: '/mycelium',
		items: [
			{
				slug: 'analyze',
				title: 'Analyze',
				label: 'Analyze',
				actionPath: '/mycelium/analyze',
			},
			{
				slug: 'engage',
				title: 'Engage',
				label: 'Engage',
				actionPath: '/mycelium/engage',
			},
		],
	},
}

export const pages: {[key: string]: NavItem} = {
	vital: {
		slug: '',
		label: 'Vital',
		title: 'Vital',
		asset: 'rainbow',
		actionPath: '/',
		items: [cta.mycelium, cta.phloem, cta.chlorophyll],
	},
}

export function buildNav(page: string) {
	const nav = {...navBase, ...pages[page]}
	nav.label = pages[page].label ?? page
	nav.items = [pages[page]]

	return nav
}

export function buildNavItems(content: SeedSection[], parent?: NavItem) {
	return content.map(({meta}) => ({
		...meta,
		label: meta.title,
		actionPath: parent?.actionPath ? `${parent.actionPath}/${meta.name}` : '/',
	}))
}
