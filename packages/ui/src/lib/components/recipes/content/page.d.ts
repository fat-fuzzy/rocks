import type {Snippet} from 'svelte'
import type {ScrollyItemProps} from '$types'

type ProseProps = {
	title: string
	slug: string
	asset: string
	children: Snippet
}

export type PageProps = {
	id?: string
	title: string
	path?: string
	description: string
	pageName?: string
	size?: string
	header?: Snippet
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

export type PageTabsProps = PageProps & TabsProps
