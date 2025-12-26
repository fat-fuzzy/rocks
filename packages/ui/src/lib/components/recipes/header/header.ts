import type {Snippet} from 'svelte'
import type {UiBlockProps, FormCommonProps, NavItem} from '$types'

export type HeaderProps = UiBlockProps &
	FormCommonProps & {
		id?: string
		title?: string
		path?: string
		position?: string
		place?: string
		reveal?: string
		auto?: boolean
		dismiss?: string
		sidebar?: Snippet
		links: NavItem[]
		children?: Snippet
	}
