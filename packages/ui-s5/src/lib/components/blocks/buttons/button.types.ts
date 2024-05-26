import type {Snippet} from 'svelte'
import type {UiBlockProps} from '$types/index.js'

export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type ButtonProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string // Use for machine id
	name: string
	text?: string
	title?: string
	value?: string | number
	disabled?: boolean
	formaction?: string

	type?: ButtonType
	children?: Snippet
	onclick?: (payload: any) => void
}
