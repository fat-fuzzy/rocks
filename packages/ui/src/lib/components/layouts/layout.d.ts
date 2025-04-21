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

export type SidebarLayoutProps = LayoutProps & {
	theme: string
	main: Snippet
	side: Snippet
}
