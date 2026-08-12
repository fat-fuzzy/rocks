import type {
	IImportService,
	IDocService,
	IPresetService,
	ITagService,
	IExportService,
} from '$types'
import ImportService from '$lib/services/ImportService.svelte'
import ExportService from '$lib/services/ExportService'
import DocService from '$lib/services/DocService.svelte'
import TagService from '$lib/services/TagService.svelte'
import PresetService from '$lib/services/PresetService.svelte'

export function createServices(): {
	importService: IImportService
	docService: IDocService
	tagService: ITagService
	presetService: IPresetService
	exportService: IExportService
} {
	const importService = new ImportService()
	const exportService = new ExportService()
	const docService = new DocService()
	const presetService = new PresetService()
	const tagService = new TagService(docService)

	return {
		importService,
		docService,
		tagService,
		presetService,
		exportService,
	}
}
