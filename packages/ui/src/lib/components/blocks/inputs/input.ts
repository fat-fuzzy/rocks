import type {Snippet} from 'svelte'
import type {
	UiStatus,
	Autocomplete,
	FuzzyPayload,
	UiBlockProps,
	IFormValidator,
} from '$types'
import type {HTMLInputTypeAttribute} from 'svelte/elements'

export type MessageGroup = {
	UiStatus: string[]
}

export type FeedbackMessage = {
	title?: string
	hint?: string
	default?: string[]
	success?: string[]
	info?: string[]
	warning?: string[]
	error?: string[]
}

export type InputFeedbackProps = {
	id: string
	size?: string
	font?: string
	variant?: string
	errors?: string[]
}

export type ValidationProps = {
	type: string
	validator: IFormValidator
}

export type InputCommonProps = {
	id: string
	name: string
	label: string
	placeholder?: string
	autocomplete?: Autocomplete

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

	children?: Snippet
	onfocus?: (event: Event, payload?: FuzzyPayload) => void
	onblur?: (event: Event, payload?: FuzzyPayload) => void
	oninput?: (event: Event, payload?: FuzzyPayload) => void
	onreset?: (event: Event, payload?: FuzzyPayload) => void
	onsubmit?: (event: Event, payload?: FuzzyPayload) => void
	onchange?: (event: Event, payload?: FuzzyPayload) => void
}

export type InputProps = UiBlockProps & ValidationProps & InputCommonProps

export type FieldsetProps = UiBlockProps & {
	/**
	 * State props
	 */
	id: string
	name: string
	legend?: string
	disabled?: boolean

	type?: HTMLInputTypeAttribute
	items?: InputProps[] // 1. EITHER Use items for InputGroups
	children?: Snippet // 2. OR use children
}

export type InputRangeProps = InputProps & {
	min?: number
	max?: number
	step?: number
	items?: {id: string; label: string; value: string}[]
	oninput?: (payload?: FuzzyPayload) => void
}

type FileType = 'image/png, image/jpeg'

export type InputFileProps = InputProps & {
	/**
	 * State props
	 */
	fileType: FileType
	multiple: boolean
}
