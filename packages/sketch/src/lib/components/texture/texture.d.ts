export type FiltersProps = {
	id: string
	color?: string
	size?: string
	variant?: string
	background?: string
	layout?: string
	breakpoint?: string
	threshold?: string
	disabled?: boolean
	channels?: string[]
	blur?: number[]
	convolutions?: string[]
	onupdate: (payload: any) => void // TODO: Fix type
	init: (payload: any) => void // TODO: Fix type
}
