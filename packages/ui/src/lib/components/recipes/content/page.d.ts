import type {Snippet} from 'svelte'
import type {
	ScrollyItemProps,
	TabsProps,
	UiSize,
	SidebarLayoutProps,
} from '$types'

type ProseProps = {
	title: string
	slug: string
	asset: string
	children: Snippet
}

export type PageHeaderProps = {
	title: string
	layout: string
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

export type RailsProps = UiLayoutProps & {
	layout: string
	lanes: number
	items: {[key: string]: Snippet}
}

export type PageTabsProps = PageProps & TabsProps

export type PageRailsProps = PageProps & RailsProps
