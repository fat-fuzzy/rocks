import type {Snippet} from 'svelte'
import type {
	FuzzyPayload,
	UiLayoutProps,
	UiContentProps,
	UiBlockProps,
	FormProps,
} from '$types'

export type LayoutProps = UiLayoutProps & UiContentProps & FormProps

export type DetailsLayoutProps = LayoutProps & {
	summary: Snippet
	variant?: string
	open?: boolean
}

export type GridLayoutProps = LayoutProps & {
	areas: string
	flex?: boolean
	navs?: Snippet
	content?: Snippet
	header?: Snippet
	actions?: Snippet
	footer?: Snippet
}

export type RevealLayoutProps = LayoutProps &
	UiBlockProps & {
		reveal: string
		element?: string
		onclick?: (payload: FuzzyPayload) => void
	}

export type SidebarLayoutProps = LayoutProps & {
	main: Snippet
	side: Snippet
}
