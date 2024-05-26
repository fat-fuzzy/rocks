import type {Snippet} from 'svelte'
import type {InputType, InputPayload, UiBlockProps} from '$types'

export type InputProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string
	name: string
	title?: string
	value?: string | number
	disabled?: boolean
	formaction?: string

	type?: InputType
	children?: Snippet
	oninput?: (payload: InputPayload) => void
}

export type FieldsetProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string
	name: string
	legend?: string
	disabled?: boolean

	type?: InputType // input group if any
	children?: Snippet
	oninput?: (payload: InputPayload) => void
}
