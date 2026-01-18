import type {NavItem} from '$types'

export type MarkdownMeta = {
	id: string
	index?: number
	slug: string
	title: string
	subtitle?: string
	description?: string
	talk?: string
	items?: NavItem[]
	series?: {title: string; items: string[]}
	status?: 'draft' | 'published' | 'archived'
	date_created?: string
	date_updated?: string
	author?: string
	tags?: string[]
	image?: string
}

export type Markdown = {
	meta: MarkdownMeta
	html: string
}
