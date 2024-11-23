import type {UiBlockProps} from '$types'
import {UiStatus, UiTextContext} from '$types'

export type FeedbackProps = UiBlockProps & {
	text?: string
	asset?: string // feedback context: code, form, dialog, prose
	context: string // feedback context: code, form, dialog, prose
	status: string // feedback color: info, success, warning, error,
	container?: string
	children: Snippet
}
