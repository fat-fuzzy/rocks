import type {Snippet} from 'svelte'
import type {UiBlockProps, UiLayoutProps, NavProps} from '@fat-fuzzy/ui'

export type ToggleRevealProps = UiBlockProps &
	UiLayoutProps & {
		id: string
		label: string
		area?: string
		children: Snippet
	}
export type ToggleNavProps = NavProps &
	ToggleRevealProps & {
		preload?: string
		skipLinks?: Snippet
	}
