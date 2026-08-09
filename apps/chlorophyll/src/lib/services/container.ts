// $lib/storage/container.ts
import SeedService from '$lib/services/storage/seed-service.svelte'
import DocumentService from '$lib/services/storage/document-service.svelte'
import TagService from '$lib/services/storage/tag-service.svelte'
import ExportService from '$lib/services/export-service'

export function createServices() {
	const documentService = new DocumentService()
	const seedService = new SeedService()
	const tagService = new TagService(documentService)
	const exportService = new ExportService()

	return {
		seedService,
		documentService,
		tagService,
		exportService,
	}
}
