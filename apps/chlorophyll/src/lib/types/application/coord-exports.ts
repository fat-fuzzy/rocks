import type {Prose} from '$types'

export interface ICoordinateExports {
	readonly export: {type: string; meta: Record<string, unknown>; data: string}
	readonly loading: boolean
	readonly error: boolean

	buildFullJSON(): Promise<string>

	buildFullMarkdown(options: {
		root: string
		content: {[id: string]: Prose}
		presets: {id: string; query: string}[]
	}): string
}
