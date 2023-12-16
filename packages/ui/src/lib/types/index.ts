export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type Settings = {
	[key: string]: string
}

export type ButtonState = {
	[key: string]: {text: string; value: string; asset: string}
}

export type Tab = {
	id: string
	title: string
	slug: string
	value?: string
}
