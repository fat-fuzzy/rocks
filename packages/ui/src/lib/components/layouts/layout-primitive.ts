import type {Snippet} from 'svelte'
import type {LayoutProps, UiLayoutProps, UiContentProps} from '$types'

export type LayoutPrimitiveProps = UiLayoutProps & UiContentProps

export type GridProps = LayoutProps & {
	areas?: {
		zone: Snippet
		grid?: boolean
		gare?: string
		scroll?: string
		exchange?: boolean
		tag?: string
	}[]
}

export type DetailsLayoutProps = LayoutProps & {
	summary: Snippet
	variant?: string
	open?: boolean
}

export type SidebarLayoutProps = LayoutProps & {
	main: Snippet
	side: Snippet
}
