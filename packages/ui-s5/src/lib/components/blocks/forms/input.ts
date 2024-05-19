import type {Snippet} from 'svelte'
import type {InputType, InputPayload, UiStyleProps} from '$types'

export type InputProps = UiStyleProps & {
	/**
	 * State props
	 */
	id: string // Use for machine id
	name: string
	title?: string
	value?: string | number
	disabled?: boolean
	formaction?: string

	type?: InputType
	children?: Snippet
	oninput?: (payload: InputPayload) => void
}
