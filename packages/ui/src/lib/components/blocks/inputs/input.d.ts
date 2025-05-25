import type {Snippet} from 'svelte'
import type {
	InputType,
	Autocomplete,
	FuzzyPayload,
	UiBlockProps,
	UiStatus,
	UiSize,
	UiVariant,
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
	onfocus?: (payload: InputPayload) => void
	onblur?: (payload: InputPayload) => void
	oninput?: (payload: InputPayload) => void
	onreset?: (payload: FuzzyPayload) => void
	onsubmit?: (payload: FuzzyPayload) => void
	onchange?: (payload: FuzzyPayload) => void
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

	type?: string // TODO:  InputType - input group if any
	items?: InputProps[] // 1. EITHER Use items for InputGroups
	children?: Snippet // 2. OR use children
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
