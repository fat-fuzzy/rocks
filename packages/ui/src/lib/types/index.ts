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

export type Geometry3dProps = {
	color: number[]
	translation?: (number | undefined)[]
	rotation?: number[]
	scale?: (number | undefined)[]
	fieldOfView?: number
	cameraAngle?: number
}

export type ProgramInfo = {
	geometry: Geometry3dProps
}

export type SceneMeta = {
	input: string
	type: string
	camera: number
}

export type Scene = {
	id: string
	draw: () => void
	clear: () => void
	update: (value: Geometry3dProps, event?: MouseEvent | TouchEvent) => void
	main: (canvas: HTMLCanvasElement) => ProgramInfo
	meta?: SceneMeta
}
