import type {Prose} from '$types'

export interface IExportService {
	buildFullJSON(): Promise<string>

	buildFullMarkdown(options: {
		root: string
		content: {[id: string]: Prose}
		presets: {id: string; query: string}[]
	}): string
}
