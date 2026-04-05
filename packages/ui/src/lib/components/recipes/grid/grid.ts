import type {NavItem, PageProps, GridProps, CookiePreferences} from '$types'

export type LayoutGridProps = GridProps & {
	app: {
		brightness: string
		contrast: string
		language?: string
		consent?: CookiePreferences
	}
	sidenav?: NavItem
	layout?: string
	path: string
}

export type PageGridProps = GridProps & {
	context?: PageProps & {
		reveal: string
		title?: string
	}
}
