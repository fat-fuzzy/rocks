import type {UiStyleProps} from '$lib/types/index.js'

export type NavProps = UiStyleProps & {
	id: string
	title: string
	path: string
	layout?: string
	size?: string
	color?: string
	background?: string
	container?: string
	align?: string
	items: any[]
}

export type LinkListProps = UiStyleProps & {
	id: string
	depth: number
	path: string
	layout?: string
	size?: string
	color?: string
	align?: string
	container?: string
	items: any[]
}
