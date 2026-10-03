import type {Snippet} from 'svelte'
import type {NavProps, ViewingPreferences} from '#types'

export type LayoutProps = {
	size?: string
	header?: Snippet
	sidenav?: NavProps
	main?: Snippet
	app?: ViewingPreferences
	url?: URL
	children?: Snippet
}
