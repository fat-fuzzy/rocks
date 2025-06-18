import type {Snippet} from 'svelte'
import type {
	ScrollyItemProps,
	TabsProps,
	UiSize,
	SidebarLayoutProps,
	NavItem,
	UiLayoutProps,
	Settings,
	CookiePreferences,
} from '$types'

type ProseProps = {
	title: string
	slug: string
	asset: string
	children: Snippet
}

export type PageHeaderProps = {
	title: string
	layout?: string
	justify?: string
	size?: UiSize
	media?: boolean
	main?: Snippet
	side?: Snippet
}

export type PageProps = {
	id?: string
	title: string
	path?: string
	hash?: string
	description: string
	pageName?: string
	size?: string
	header?: SidebarLayoutProps
	layout?: string
	justify?: string
	children?: Snippet
}

export type PageScrollyProps = PageProps & {
	fixed?: boolean
	dimensions?: string
	animations?: string[]
	items: ScrollyItemProps[]
}

export type PageRailsProps = UiLayoutProps &
	PageProps & {
		nav: NavItem[]
		main: Snippet
		details?: Snippet
		aside?: Snippet
		useHeader?: boolean
		app?: {
			reveal: string
			brightness: string
			contrast: string
			language?: string
			consent?: CookiePreferences
		}
		context?: {
			reveal: string
			title?: string
		}
		footer?: Snippet
	}

export type PageTabsProps = PageProps & TabsProps
