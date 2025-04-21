import type {Snippet} from 'svelte'
import type {LayoutProps} from '$types'

export type LayoutGridProps = LayoutProps & {
	grid: string
	areas?: string
	flex?: boolean
	navs?: Snippet
	content?: Snippet
	header?: Snippet
	actions?: Snippet
	footer?: Snippet
}
