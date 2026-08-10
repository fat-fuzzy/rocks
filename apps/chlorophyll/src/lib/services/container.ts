import SeedService from '$lib/services/storage/seed-service.svelte'
import DocumentService from '$lib/services/storage/DocumentService.svelte'
import TagService from '$lib/services/storage/tag-service.svelte'
import ExportService from '$lib/services/export-service'
import PresetService from '$lib/services/storage/preset-service.svelte'

export function createServices() {
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
