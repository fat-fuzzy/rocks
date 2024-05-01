export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined
export type InputType =
	| 'text'
	| 'number'
	| 'range'
	| 'radio'
	| 'checkbox'
	| 'file'
	| 'email'
	| 'submit'

export type UiDimensions = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonContext = {
	id: string // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value. TODO : clean this
	name: string
}

export enum UiState {
	active = 'active',
	inactive = 'inactive',
}

export enum ButtonEventType {
	EXPAND = 'EXPAND',
	TOGGLE = 'TOGGLE',
	SWITCH = 'SWITCH',
}

export type Settings = {
	[key: string]: string
}

export type InputPayload = {
	id: string // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
	name: string
	value: string
}
export type UiStyleProps = {
	/**
	 * Style props
	 */
	align?: string
	asset?: string // emoji:value or svg:value
	color?: string
	size?: string
	shape?: string
	variant?: string

	container?: string
	dimensions?: string
	layout?: string
	threshold?: string
	breakpoint?: string
}

export type ButtonState = {
	text: string
	value: string
	asset: string
	variant?: string
	onclick: (event: MouseEvent, payload: any) => void
}

export type SwitchState = {
	id: string
	value: string
	pressed: boolean
	name: string
	send: (event: string) => unknown
}

export type Tab = {
	id: string
	title: string
	value?: string
	initial?: string
	size?: string
	color?: string
	asset?: string
}
