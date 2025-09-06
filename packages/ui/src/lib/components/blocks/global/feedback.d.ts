import type {UiBlockProps, UiLayoutProps} from '$types'

export type FeedbackProps = UiBlockProps &
	UiLayoutProps & {
		id?: string
		title?: string
		text?: string
		context: string // feedback context: code, form, dialog, prose
		status: string // feedback color: info, success, warning, error,
		element?: string
		children: Snippet
	}
