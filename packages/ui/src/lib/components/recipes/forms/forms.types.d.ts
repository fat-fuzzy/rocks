import type {InputProps, ButtonType} from '$types'

export type FormProps = InputProps & {
	depth?: number
	description?: string
	formaction?: string
	actionPath?: string
	redirect?: string
	method?: string
	disabled?: boolean
}
