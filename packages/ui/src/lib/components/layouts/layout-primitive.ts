import type {Snippet} from 'svelte'
import type {LayoutProps, UiLayoutProps, UiContentProps} from '$types'

export type LayoutPrimitiveProps = LayoutProps & UiLayoutProps & UiContentProps

export type GridProps = LayoutPrimitiveProps & {
	areas?: {
		zone: Snippet
		grid?: boolean
		gare?: string
		scroll?: string
		exchange?: boolean
		tag?: string
	}[]
}

export type DetailsLayoutProps = LayoutPrimitiveProps & {
	summary: Snippet
	variant?: string
	open?: boolean
}

export type SidebarLayoutProps = LayoutPrimitiveProps & {
	main: Snippet
	side: Snippet
}
