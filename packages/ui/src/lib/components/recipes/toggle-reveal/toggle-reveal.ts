import type {Snippet} from 'svelte'
import type {
	UiBlockProps,
	UiLayoutProps,
	NavProps,
	NavItem,
	ViewingPreferences,
} from '$types'

export type ToggleRevealProps = UiBlockProps &
	UiLayoutProps & {
		id: string
		label: string
		auto?: boolean // Auto collapse in small viewports
		dismiss?: string
		checked?: boolean // Initial state
		area?: string
		nav?: Snippet
		children: Snippet
	}
export type ToggleNavProps = NavProps &
	ToggleRevealProps & {
		preload?: string
		skipLinks?: Snippet
	}

export type ToggleTreeProps = UiBlockProps & {
	id: string
	depth: number
	pathname: string // Current page url.pathname
	layout?: string
	align?: string
	area?: string
	container?: string
	preload?: boolean
	items: NavItem[]
}

export type ToggleLinkProps = UiBlockProps & {
	href: string
	slug: string
	label: string
	area?: string
	place?: string
	children: Snippet
	depth: number
}

export type ToggleContextProps = UiBlockProps & {
	path?: string
	actionPath?: string
	context: ViewingPreferences
}
