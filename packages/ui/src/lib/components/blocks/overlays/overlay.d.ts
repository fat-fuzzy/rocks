import type {UiBlockProps, UiLayoutProps} from '$types'

export type OverlayProps = UiBlockProps &
	UiLayoutProps & {
		id: string
		title: string
		open?: boolean
		header?: Snippet
		main?: Snippet
		footer?: Snippet
		children?: Snippet
	}
