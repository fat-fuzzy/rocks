import type {
	UiBlockProps,
	RevealLayoutProps,
	FuzzyPayload,
	FormCommonProps,
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
	title: string
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
	path: string
	layout?: string
	background?: string
	container?: string
	align?: string
	items: NavItem[]
}

export type PageNavProps = UiBlockProps & {
	id: string
	label?: string
	hash?: string
	layout?: string
	background?: string
	container?: string
	align?: string
	items: NavItem[]
}

export type BreadcrumbsProps = UiBlockProps & {
	level: number
	id: string
	title?: string
	path: string
	layout?: string
	background?: string
	container?: string
	align?: string
	breadcrumbTabs?: Snippet // TODO: deprecate with tabs
}

export type LinkTreeProps = UiBlockProps & {
	id: string
	depth: number
	path: string
	layout?: string
	align?: string
	container?: string
	preload?: string
	items: NavItem[]
	redirect?: string
	oninput?: (payload: FuzzyPayload) => void
}

export type ExpandLinkProps = UiBlockProps & {
	href: string
	slug: string
	title: string
	children: Snippet
	reveal: UiState
	depth: number
	formaction?: string
	actionParams?: string
	actionPath?: string
	onclick?: (payload: FuzzyPayload) => void
}

export type RevealNavProps = NavProps &
	RevealLayoutProps &
	FormCommonProps & {
		type?: string
		validator?: string
		settings?: any
		preload?: string
		onclick?: (payload: FuzzyPayload) => void
	}
