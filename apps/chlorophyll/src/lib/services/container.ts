// $lib/storage/container.ts
import SeedService from '$lib/services/storage/seed-service.svelte'
import DocumentService from '$lib/services/storage/document-service.svelte'
import TagService from '$lib/services/storage/tag-service.svelte'
import ExportService from '$lib/services/export-service'
import PresetService from '$lib/services/storage/preset-service.svelte'

export function createServices() {
	const documentService = new DocumentService()
	const seedService = new SeedService()
	const tagService = new TagService(documentService)
	const presetService = new PresetService()
	const exportService = new ExportService()

	return {
		seedService,
		documentService,
		tagService,
		presetService,
		exportService,
	}
}
