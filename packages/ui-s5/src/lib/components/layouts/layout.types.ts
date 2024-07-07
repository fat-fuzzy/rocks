import type {Snippet} from 'svelte'
import type {UiLayoutProps, UiContentProps, UiBlockProps} from '$types/index.js'
import type {FormProps} from '$lib/components/recipes/forms/forms.types.js'

export type LayoutProps = UiLayoutProps & UiContentProps & FormProps

export type DetailsLayoutProps = LayoutProps & {
	summary: Snippet
	variant?: string
	open?: boolean
}

export type GridLayoutProps = LayoutProps & {
	areas: string
	flex?: boolean
	navs?: Snippet
	content?: Snippet
	header?: Snippet
	actions?: Snippet
	footer?: Snippet
}

export type RevealLayoutProps = LayoutProps &
	UiBlockProps & {
		reveal: string
	}

export type SidebarLayoutProps = LayoutProps & {
	main: Snippet
	side: Snippet
}
