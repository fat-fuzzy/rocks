import type {Prose} from '$types'

export interface ICoordinateExports {
	buildFullJSON(): Promise<string>

	buildFullMarkdown(options: {
		root: string
		content: {[id: string]: Prose}
		presets: {id: string; query: string}[]
	}): string
}
