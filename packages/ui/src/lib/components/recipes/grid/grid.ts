import type {NavItem, PageProps, GridProps, ViewingPreferences} from '$types'

export type LayoutGridProps = GridProps & {
	app: ViewingPreferences
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
