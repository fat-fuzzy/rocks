import type {UiBlockProps} from '$types'
import {UiStatus, UiTextContext} from '$types'

export type FeedbackProps = UiBlockProps & {
	text?: string
	context: UiTextContext // feedback context: code, form, dialog, prose
	status: UiStatus // feedback color: info, success, warning, error,
	container?: string
	children: Snippet
}
