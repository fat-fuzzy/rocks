export type ButtonType = 'button' | 'submit' | 'reset' | null | undefined
export enum UiState { active ='active', inactive= 'inactive'}

export type Settings = {
	[key: string]: string
}

export type ButtonPayload =  {
	id: string, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
	name: string,
	value: string
}

export type ButtonState =  {
	text: string
	value: string
	asset: string
	variant?: string
	onclick: (event: MouseEvent, payload:any) => void;
}

export type ButtonStates = {
	[UiState.active]: ButtonState,
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

export type GeometryProps = {
	color: number[]
	translation: (number | undefined)[]
	rotation: number[]
	scale: (number | undefined)[]
}

export type SceneContext = GeometryProps & {
	fieldOfView?: number
	cameraAngle?: number
	animationSpeed?: number
	pause?: boolean
	image?: HTMLImageElement
}

export type ProgramInfo = {
	context: SceneContext
}

export type SceneMeta = {
	input: string
	type: string
	camera: number
	filename?: string
	channels?: string[]
	blur?: string[]
	convolutions?: string[]
}

export type Filters = {
	channels?: string
	blur?: string
	effects?: string[]
}

export type SceneOptions = {
	url?: string
	filters: Filters
}

export type Scene = {
	id: string
	draw: () => void
	clear: () => void
	update: (value: SceneContext, event?: MouseEvent | TouchEvent) => void
	main: (canvas: HTMLCanvasElement, options?: SceneOptions) => ProgramInfo
	meta?: SceneMeta
}
