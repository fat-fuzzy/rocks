import type {Snippet} from 'svelte'
import type {FuzzyPayload, UiBlockProps} from '$types'

export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type ButtonProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string
	name: string
	label?: string
	title?: string
	value?: string | number
	disabled?: boolean
	popovertarget?: string
	formaction?: string

	type?: ButtonType
	children?: Snippet
	onclick?: (payload: FuzzyPayload) => void
}
