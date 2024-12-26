import type {
	UiRevealState,
	UiBlockProps,
	RevealLayoutProps,
	FuzzyPayload,
	FormCommonProps,
	Tab,
} from '$types'
import type {Snippet} from 'svelte'

export type NavProps = UiBlockProps & {
	id: string
	title: string
	path: string
	layout?: string
	background?: string
	container?: string
	align?: string
	items: any[]
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
	breadcrumbTabs?: Snippet
}

export type LinkTreeProps = UiBlockProps & {
	id: string
	depth: number
	path: string
	layout?: string
	align?: string
	container?: string
	items: any[]
	redirect?: string
	oninput?: (payload: FuzzyPayload) => void
}

export type ExpandLinkProps = UiBlockProps & {
	href: string
	slug: string
	title: string
	children: Snippet
	reveal: UiState
	formaction?: string
	onclick?: (payload: FuzzyPayload) => void
}

export type RevealNavProps = NavProps &
	RevealLayoutProps &
	FormCommonProps & {
		type?: string
		validator?: string
		settings?: any
		onclick?: (payload: FuzzyPayload) => void
	}
