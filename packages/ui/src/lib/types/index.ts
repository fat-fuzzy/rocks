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

export type GeometryProps = {
	color: number[]
	translation: number[]
	rotation: number[]
	scale: number[]
	width: number // of geometry
	height: number // of geometry
}

export type ProgramInfo = {
	geometry: GeometryProps
}

export type Scene = {
	id: string
	draw: () => void
	clear: () => void
	update: (value: GeometryProps) => void
	main: (canvas: HTMLCanvasElement) => ProgramInfo
}
