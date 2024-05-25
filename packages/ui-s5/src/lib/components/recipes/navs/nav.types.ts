import type {UiStyleProps} from '$lib/types/index.js'
import type {RevealLayoutProps} from '$lib/components/layouts/layout.types.js'

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

export type RevealNavProps = NavProps &
	RevealLayoutProps & {
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
		settings: any
	}
