import type {
	Settings,
	UiBlockProps,
	RevealLayoutProps,
	FuzzyPayload,
} from '$types'
import type {Snippet} from 'svelte'

export type NavProps = UiBlockProps & {
	id: string
	title: string
	path: string
	layout?: string
	size?: string
	color?: string
	background?: string
	container?: string
	align?: string
	items: any[]
}

export type LinkListProps = UiBlockProps & {
	id: string
	depth: number
	path: string
	layout?: string
	size?: string
	color?: string
	align?: string
	container?: string
	items: any[]
	redirect?: string
}

export type ExpandLinkProps = UiBlockProps & {
	href: string
	slug: string
	title: string
	children: Snippet
	reveal: Settings
	formaction: string
	redirect: string
	onclick?: (payload: FuzzyPayload) => void
}

export type RevealNavProps = NavProps &
	RevealLayoutProps & {
		id: string
		title: string
		path: string
		layout?: string
		size?: string
		color?: string
		background?: string
		container?: string
		align?: string
		items: any[]
		settings?: any
		onclick?: (payload: FuzzyPayload) => void
	}
