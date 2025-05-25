import type {UiBlockProps, UiLayoutProps} from '$types'
import {UiStatus, UiTextContext} from '$types'

export type FeedbackProps = UiBlockProps &
	UiLayoutProps & {
		id?: string
		text?: string
		context: string // feedback context: code, form, dialog, prose
		status: string // feedback color: info, success, warning, error,
		children: Snippet
	}
