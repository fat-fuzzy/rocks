import type {Snippet} from 'svelte'
import type {
	InputType,
	InputPayload,
	UiBlockProps,
	UiStatus,
} from '$types/index.js'

export type InputProps = UiBlockProps & {
	id: string
	name: string
	label: string
	placeholder?: string

	/**
	 * State props
	 */
	hint?: string
	status?: UiStatus
	checked?: boolean
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

type FileType = 'image/png, image/jpeg'

export type InputFileProps = InputProps & {
	/**
	 * State props
	 */
	fileType: FileType
	multiple: boolean
}
