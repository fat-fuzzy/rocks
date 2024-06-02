export type Settings = {
	[key: string]: string
}

export type Tab = {
	id: string
	name: string
	title: string
	value?: string
	initial?: string
	size?: string
	color?: string
	asset?: string
}
