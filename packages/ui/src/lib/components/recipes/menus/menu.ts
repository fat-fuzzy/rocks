import type {
	UiBlockProps,
	ButtonProps,
	RevealLayoutProps,
	FuzzyPayload,
} from '$types'

export type ButtonMenuProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string
	title?: string
	mode?: string
	disabled?: boolean | undefined
	formaction?: string
	items: ButtonProps[]
	onupdate?: (payload: FuzzyPayload) => void
}

export type RevealMenuProps = RevealLayoutProps & {
	items: ButtonProps[]
	onclick?: (payload: FuzzyPayload) => void // TODO: type this
}
