import type {UiBlockProps, UiLayoutProps, AriaInvoke} from '$types'

export type OverlayProps = UiBlockProps &
	UiLayoutProps & {
		id: string
		role?: string // AriaRole
		title: string
		invoke?: AriaInvoke
		open?: boolean
		fixed?: string
		children?: Snippet
		onbeforetoggle?: (payload: FuzzyPayload) => void
	}
