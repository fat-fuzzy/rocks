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
export type GridProps = LayoutProps & {
	areas?: {
		zone: Snippet
		grid?: boolean
		gare?: string
		scroll?: string
	}[]
}

export type DetailsLayoutProps = LayoutProps & {
	summary: Snippet
	variant?: string
	open?: boolean
}

export type SidebarLayoutProps = LayoutProps & {
	main: Snippet
	side: Snippet
}
