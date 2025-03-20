import type {Snippet} from 'svelte'
import type {
	FuzzyPayload,
	DismissEvent,
	UiLayoutProps,
	UiContentProps,
	UiBlockProps,
	FormProps,
	UiAnimationEvent,
	NavItem,
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
		auto?: boolean
		element?: string
		trigger?: UiAnimationEvent
		dismiss?: DismissEvent
		onclick?: (payload: FuzzyPayload) => void
	}

export type SidebarLayoutProps = LayoutProps & {
	theme: string
	main: Snippet
	side: Snippet
}

export type LayoutRailsProps = LayoutProps & {
	children: Snippet
}
