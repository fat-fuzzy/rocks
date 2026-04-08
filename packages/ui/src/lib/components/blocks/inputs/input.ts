import type {Snippet} from 'svelte'
import type {
	UiStatus,
	AutoComplete,
	FuzzyPayload,
	UiBlockProps,
	IFormValidator,
	UiSize,
	UiVariant,
	UiAssetType,
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
	size?: UiSize
	font?: UiSize
	assetType?: UiAssetType
	asset?: UiSize
	variant?: UiVariant
	errors?: string[]
	hint?: string
	isUiControl?: boolean
}

export type ValidationProps = {
	type?: string
	pattern?: string
	validator: IFormValidator
}

export type InputCommonProps = {
	id: string
	label: string
	placeholder?: string
	autocomplete?: AutoComplete

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
}

export type InputCallbackProps = {
	onfocus?: (event: Event, payload?: FuzzyPayload) => void
	onblur?: (event: Event, payload?: FuzzyPayload) => void
	oninput?: (event: Event, payload?: FuzzyPayload) => void
	onreset?: (event: Event, payload?: FuzzyPayload) => void
	onsubmit?: (event: Event, payload?: FuzzyPayload) => void
	onchange?: (event: Event, payload?: FuzzyPayload) => void
}

export type InputProps = UiBlockProps &
	ValidationProps &
	InputCommonProps &
	InputCallbackProps & {
		name: string
	}

export type InputRadioProps = UiBlockProps &
	ValidationProps &
	InputCommonProps &
	InputCallbackProps & {
		name?: string
		isUiControl?: boolean
	}

export type InputCheckProps = InputRadioProps & {
	indeterminate?: boolean
}

export type FieldsetProps = UiBlockProps &
	InputCallbackProps &
	InputFeedbackProps & {
		/**
		 * State props
		 */
		id: string
		name: string
		value?: string[]
		legend?: string
		ariaDescribedby?: string
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
