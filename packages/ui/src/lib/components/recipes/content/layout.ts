import type {Snippet} from 'svelte'
import type {RevealNavProps} from '$types'

export type LayoutProps = {
	size?: string
	header?: Snippet
	sidenav?: RevealNavProps
	main?: Snippet
	app?: {settings: {[key: string]: string}}
	children?: Snippet
}
