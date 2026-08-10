import type {
	ISeedService,
	IDocumentService,
	IPresetService,
	ITagService,
	IExportService,
} from '$types'
import SeedService from '$lib/services/storage/SeedService.svelte'
import DocumentService from '$lib/services/storage/DocumentService.svelte'
import TagService from '$lib/services/storage/TagService.svelte'
import ExportService from '$lib/services/ExportService'
import PresetService from '$lib/services/storage/PresetService.svelte'

export function createServices(): {
	seedService: ISeedService
	documentService: IDocumentService
	tagService: ITagService
	presetService: IPresetService
	exportService: IExportService
} {
	const seedService = new SeedService()
	const documentService = new DocumentService()
	const presetService = new PresetService()
	const exportService = new ExportService()
	const tagService = new TagService(documentService)

	return {
		seedService,
		documentService,
		tagService,
		presetService,
		exportService,
	}
}
