import type {Snippet} from 'svelte'
import type {
	InputType,
	FuzzyPayload,
	UiBlockProps,
	UiStatus,
	IFormValidator,
} from '$types'

export type MessageGroup = {
	[UiStatus]: string[]
}

export type FeedbackMessage = {
	title?: string
	hint?: string
	[UiStatus.default]?: string[]
	[UiStatus.success]?: string[]
	[UiStatus.info]?: string[]
	[UiStatus.warning]?: string[]
	[UiStatus.error]?: string[]
}

export type InputFeedbackProps = {
	size?: string
	errors?: string[]
}

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
	required?: boolean

	type?: InputType
	children?: Snippet
	onfocus?: (payload: InputPayload) => void
	onblur?: (payload: InputPayload) => void
	oninput?: (payload: InputPayload) => void
	validator: IFormValidator
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
}

export type InputRangeProps = InputProps & {
	min?: number
	max?: number
	step?: number
	items?: number[]
}

type FileType = 'image/png, image/jpeg'

export type InputFileProps = InputProps & {
	/**
	 * State props
	 */
	fileType: FileType
	multiple: boolean
}
