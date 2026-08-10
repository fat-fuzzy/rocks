import type {Prose, IExportService} from '$types'

import {
	getContentData,
	getPresetsData,
	getBaseData,
	getStructureData,
} from '$lib/workers/storage/opfs'

export default class ExportService implements IExportService {
	async buildFullJSON(): Promise<string> {
		// Load returns stringified data (worker message boundary)
		const [contentResult, presetsResult, baseResult, structureResult] =
			await Promise.all([
				getContentData(),
				getPresetsData(),
				getBaseData(),
				getStructureData(),
			])

		// Parse to JSON here — at worker message boundary inwards
		// (we need objects to merge)
		const content = contentResult.data
		const presets = presetsResult.data
		const base = baseResult
		const structure = structureResult

		const exportData = {content, presets, base, structure}

		// Stringify here — at the download boundary outwards
		return JSON.stringify(exportData, null, 2)
	}

	// TODO Export markdowns
	buildFullMarkdown(options: {
		root: string
		content: {[id: string]: Prose}
		presets: {id: string; query: string}[]
	}): string {
		const {content} = options
		let html = ''

		Object.keys(content).forEach((key) => {
			html += content[key].html
		})

		return html
	}
}
