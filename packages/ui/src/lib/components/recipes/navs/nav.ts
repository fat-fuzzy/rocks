import type {
	UiBlockProps,
	FuzzyPayload,
	UiRevealState,
	UiState,
	UiShape,
	UiVariant,
	UiSize,
	UiColor,
} from '$types'

import type {Snippet} from 'svelte'

export type NavItem = {
	slug: string
	label: string
	asset?: string
	color?: UiColor
	size?: UiSize
	variant?: UiVariant
	shape?: UiShape
	reveal?: UiRevealState
	formaction?: string
	actionPath?: string
	itemPath?: string
	preload?: string
	items?: NavItem[]
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

export type LinkTreeProps = UiBlockProps & {
	id: string
	depth: number
	path: string
	pathname: string
	preload?: string
	items: NavItem[]
	redirect?: string
	oninput?: (payload: FuzzyPayload) => void
}

export type ExpandLinkProps = UiBlockProps & {
	href: string
	slug: string
	label: string
	children: Snippet
	reveal: UiState
	depth: number
	formaction?: string
	actionParams?: string
	actionPath?: string
	onclick?: (payload: FuzzyPayload) => void
}
