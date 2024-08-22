import type {InputCommonProps, ButtonType} from '$types'

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
	actionPath?: string
	redirect?: string
	method?: string
	disabled?: boolean
}
