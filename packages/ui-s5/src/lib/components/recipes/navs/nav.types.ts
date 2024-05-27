import type {UiBlockProps} from '$lib/types/index.js'
import type {RevealLayoutProps} from '$lib/components/layouts/layout.types.js'

export type NavProps = UiBlockProps & {
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

export type LinkListProps = UiBlockProps & {
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
		onupdate: (payload: {
			name: string
			value: string | number
			state: string
		}) => void
	}
