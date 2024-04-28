export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type ButtonContext = {
	id: string // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value. TODO : clean this
	name: string
}

export enum UiState {
	active = 'active',
	inactive = 'inactive',
}

export type Settings = {
	[key: string]: string
}

export type ButtonPayload = {
	id: string // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
	name: string
	value: string
}

export type ButtonState = {
	text: string
	value: string
	asset: string
	variant?: string
	onclick: (event: MouseEvent, payload: any) => void
}

export type ButtonStates = {
	[UiState.active]: ButtonState
	[UiState.inactive]: ButtonState
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
