import type {AriaRole} from 'svelte/elements'
import type {Snippet} from 'svelte'
import type {
	UiBlockProps,
	UiLayoutProps,
	FuzzyPayload,
	AriaInvoke,
} from '$types'

export type OverlayProps = UiBlockProps &
	UiLayoutProps & {
		id: string
		role?: AriaRole // See: https://hidde.blog/popover-semantics/
		title: string
		invoke?: AriaInvoke
		open?: boolean
		fixed?: string
		children?: Snippet
		onbeforetoggle?: (event: Event, payload?: FuzzyPayload) => void
	}
