import type {UiBlockProps, ButtonProps, FuzzyPayload} from '$types'

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
