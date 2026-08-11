import type {
	ISeedService,
	IDocService,
	IPresetService,
	ITagService,
	IExportService,
} from '$types'
import SeedService from '$lib/services/storage/SeedService.svelte'
import DocService from '$lib/services/storage/DocService.svelte'
import TagService from '$lib/services/storage/TagService.svelte'
import ExportService from '$lib/services/ExportService'
import PresetService from '$lib/services/storage/PresetService.svelte'

export function createServices(): {
	seedService: ISeedService
	docService: IDocService
	tagService: ITagService
	presetService: IPresetService
	exportService: IExportService
} {
	const seedService = new SeedService()
	const docService = new DocService()
	const presetService = new PresetService()
	const exportService = new ExportService()
	const tagService = new TagService(docService)

	return {
		seedService,
		docService,
		tagService,
		presetService,
		exportService,
	}
}
