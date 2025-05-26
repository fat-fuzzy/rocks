import type {UiBlockProps, UiLayoutProps} from '$types'

export type ContentProps = UiBlockProps &
	UiLayoutProps & {
		id?: string
		element?: string
		header?: Snippet
		footer?: Snippet
		main?: Snippet // This is not a <main> tag, but a main content area
		children?: Snippet // Specify EITHER main or children
	}
