export type CameraProps = {
	id?: string
	label?: string
	size?: string
	color?: string
	angle: number
	min?: number
	max?: number
	step?: number
	disabled?: boolean
	onupdate: (payload: {value: number}) => void
}

export type FieldOfViewProps = {
	id?: string
	label?: string
	size?: string
	color?: string
	fieldOfView: number
	min?: number
	max?: number
	step?: number
	disabled?: boolean
	onupdate: (payload: {value: number}) => void
}
