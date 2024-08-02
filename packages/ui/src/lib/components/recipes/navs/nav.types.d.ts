import type {UiBlockProps, RevealLayoutProps, FuzzyPayload} from '$types'

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
		settings?: any
		onclick?: (payload: FuzzyPayload) => void
	}
