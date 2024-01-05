export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

export type Settings = {
	[key: string]: string
}

export type ButtonState = {
	[key: string]: {
		text: string
		value: string
		asset: string
		variant?: string
		onClick?: (event: CustomEvent<any>) => void
	}
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

export type GeometryProps = {
	color: number[]
	translation: (number | undefined)[]
	rotation: number | number[]
	scale: (number | undefined)[]
	width: number // of geometry
	height: number // of geometry
	depth?: number
}

export type Geometry3dProps = {
	color: number[]
	translation: (number | undefined)[]
	rotation: number[]
	scale: (number | undefined)[]
	width: number // of geometry
	height: number // of geometry
	depth?: number
	fieldOfView: number
}

export type ProgramInfo = {
	geometry: GeometryProps
}

export type SceneMeta = {
	input: string
	type: string
	minScaleX: number
	minScaleY: number
	minScaleZ?: number
	depth: number
}

export type Scene = {
	id: string
	draw: () => void
	clear: () => void
	update: (value: GeometryProps, event?: MouseEvent | TouchEvent) => void
	main: (canvas: HTMLCanvasElement) => ProgramInfo
	meta?: SceneMeta
}
