import type {Snippet} from 'svelte'
import type {NavProps} from '$types'

export type LayoutProps = {
	size?: string
	header?: Snippet
	sidenav?: NavProps
	main?: Snippet
	app?: {settings: {[key: string]: string}}
	children?: Snippet
}
