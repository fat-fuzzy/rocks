export interface Sketch {
	slug: string
	title: string
	date?: number
	emoji: string
	id: string
	interactive?: boolean
	duration?: number
	audio?: boolean
	playbackRate?: number
	color?: [number, number, number, number] | null
	webGlProps?: any // TODO: fix type
	vert?: string
	frag?: string
	url?: string
	type?: string
	draw: string | null
}
