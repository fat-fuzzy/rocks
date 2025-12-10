import type {Snippet} from 'svelte'
import type {UiBlockProps, UiLayoutProps, UiStatus, UiTextContext} from '$types'

export type FeedbackProps = UiBlockProps &
	UiLayoutProps & {
		id?: string
		title?: string
		text?: string
		context: UiTextContext // feedback context: code, form, dialog, prose
		status: UiStatus // feedback color: info, success, warning, error,
		element?: string
		children: Snippet
	}
