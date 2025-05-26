import type {Snippet} from 'svelte'
import type {LayoutProps, NavItem, PageProps, GridProps} from '$types'

export type LayoutGridProps = GridProps & {
	app?: {
		reveal: UiRevealState
		brightness: string
		contrast: string
		language?: string
		consent?: CookiePreferences
	}
	sidenav?: NavItem
}

export type PageGridProps = GridProps & {
	context?: PageProps & {
		reveal: UiRevealState
		title?: string
	}
}
