export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type Settings = {
	[key: string]: string
}

export type ButtonState = {
	[key: string]: {text: string; value: string; asset: string; onClick: () => void}
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
