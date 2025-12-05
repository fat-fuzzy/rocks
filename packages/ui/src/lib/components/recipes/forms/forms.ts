import type {InputCommonProps, InputProps} from '$types'
import FormValidator from '$lib/utils/validate-form.svelte.js'

export type FormCommonProps = InputCommonProps & {
	depth?: number
	description?: string
	formaction?: string
	actionPath?: string
	redirect?: string
	method?: string
	disabled?: boolean
}

export type FormProps = InputProps & {
	depth?: number
	description?: string
	formaction?: string
	path?: string
	redirect?: string
	method?: string
	disabled?: boolean
	validator: typeof FormValidator
	inputTypes: {[name: string]: string}
}

export type SignUpProps = InputProps & {
	level?: number
	description?: string
	formaction?: string
	actionPath?: string
	redirect?: string
	method?: string
	disabled?: boolean
}

export type CookiesPreferencesProps = InputProps & {
	level?: number
	description?: string
	formaction?: string
	actionPath?: string
	redirect?: string
	method?: string
	disabled?: boolean
}
