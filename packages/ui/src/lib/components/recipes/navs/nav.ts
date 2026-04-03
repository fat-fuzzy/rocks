import type {UiBlockProps, UiShape, UiVariant, UiSize, UiColor} from '$types'

import type {Snippet} from 'svelte'

export type NavItem = {
	slug: string
	label: string
	asset?: string
	color?: UiColor
	size?: UiSize
	variant?: UiVariant
	shape?: UiShape
	formaction?: string
	actionPath?: string
	itemPath?: string
	preload?: string
	items?: NavItem[]
	url?: URL
}

export type NavProps = UiBlockProps & {
	id: string
	title: string
	label?: string
	pathname: string
	align?: string
	items: NavItem[]
}

export type PageNavProps = UiBlockProps & {
	id: string
	label?: string
	hash?: string
	items: NavItem[]
}

export type BreadcrumbsProps = UiBlockProps & {
	level: number
	id: string
	label?: string
	path: string
	breadcrumbTabs?: Snippet // TODO: deprecate with tabs
}
