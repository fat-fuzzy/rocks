import type {Snippet} from 'svelte'
import type {LayoutProps, NavItem, PageProps, GridProps} from '$types'

export type LayoutGridProps = GridProps & {
	app?: {
		reveal: string
		brightness: string
		contrast: string
		language?: string
		consent?: CookiePreferences
	}
	sidenav?: NavItem
}

export type PageGridProps = GridProps & {
	context?: PageProps & {
		reveal: string
		title?: string
	}
}
