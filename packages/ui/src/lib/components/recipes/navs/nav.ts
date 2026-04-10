import type {UiBlockProps, UiControl} from '$types'

import type {Snippet} from 'svelte'

export type NavItem = UiControl

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
