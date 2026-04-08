import type {Snippet} from 'svelte'
import type {LayoutProps, UiLayoutProps, UiContentProps} from '$types'

export type LayoutPrimitiveProps = LayoutProps & UiLayoutProps & UiContentProps

export type AreaProps = {
	zone: Snippet
	grid?: boolean
	gare?: string
	scroll?: string
	exchange?: boolean
	tag?: string
	hug?: boolean
}

export type GridProps = LayoutPrimitiveProps & {
	areas?: AreaProps[]
}

export type DetailsLayoutProps = LayoutPrimitiveProps & {
	summary: Snippet
	variant?: string
	open?: boolean
}

export type SidebarLayoutProps = LayoutPrimitiveProps & {
	main: Snippet
	side: Snippet
	reverse?: boolean
	wrap?: string
}
