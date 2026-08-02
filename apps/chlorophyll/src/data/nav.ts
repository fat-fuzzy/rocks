import type {NavItem, UiColor, UiShape, UiSize, UiVariant} from '@fat-fuzzy/ui'
import type {SeedSection} from '$types'

export const links = [{slug: 'cv', title: 'CV', label: 'CV', layout: 'metro'}]

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

export const pages: {[key: string]: NavItem} = {
	chlorophyll: {
		slug: '',
		label: 'Chlorophyll',
		title: 'Home',
		asset: 'home',
		actionPath: '/',
		items: [
			{
				slug: 'cv',
				title: 'CV',
				label: 'CV',
				asset: 'usage',
				actionPath: '/cv',
			},
		],
	},
}

export const cta: {[key: string]: NavItem} = {
	cv: {
		slug: 'cv',
		label: 'CV',
		title: 'CV',
		asset: 'usage',
		layout: 'tram',
		actionPath: '/cv',
		items: [
			{
				slug: 'edit',
				title: 'Edit',
				label: 'Edit',
				asset: 'speaking',
				actionPath: '/cv/edit',
			},
			{
				slug: 'build',
				title: 'Build',
				label: 'Build',
				asset: 'settings',
				actionPath: '/cv/build',
			},
			{
				slug: 'preview',
				title: 'Preview',
				label: 'Preview',
				asset: 'decisions',
				actionPath: '/cv/preview',
			},
			{
				slug: 'print',
				title: 'Print',
				label: 'Print',
				asset: 'center-origin',
				actionPath: '/cv/print',
			},
		],
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
