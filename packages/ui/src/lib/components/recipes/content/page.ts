import type {Snippet} from 'svelte'
import type {
	ScrollyItemProps,
	TabsProps,
	UiSize,
	SidebarLayoutProps,
	NavItem,
	UiLayoutProps,
	CookiePreferences,
	UiLayout,
} from '$types'

export type ProseProps = {
	title: string
	slug: string
	asset: string
	children: Snippet
}

export type PageHeaderProps = {
	title: string
	layout?: UiLayout
	justify?: string
	text?: UiSize
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
	text?: string
	header?: SidebarLayoutProps
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
		headerLayout?: UiLayout
		app?: {
			brightness: string
			contrast: string
			language?: string
			consent?: CookiePreferences
		}
		context?: {
			title?: string
		}
		footer?: Snippet
	}

export type PageTabsProps = PageProps & TabsProps
