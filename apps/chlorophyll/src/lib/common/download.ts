/**
 * Cross-browser file download dialog
 * @param filename
 * @param blob data to save
 */
async function createDownloadLink(filename: string, blob: Blob): Promise<void> {
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	a.click()
	URL.revokeObjectURL(url)
}

/**
 * Chromium & Webkit only
 * @param filename
 * @param blob data to save
 */
async function showDownloadDialog(filename: string, blob: Blob): Promise<void> {
	let writable
	try {
		const handle = await window.showSaveFilePicker({
			suggestedName: filename,
			types: [
				{
					description: 'JSON file',
					accept: {'application/json': ['.json']},
				},
			],
		})
		writable = await handle.createWritable()
		await writable.write(blob)
		await writable.close()
		return
	} catch (error) {
		await writable?.close()
		// User cancelled the picker — don't fall through to download
		if ((error as DOMException).name === 'AbortError') return
		// Any other error — fall through to fallback
		throw new Error('File picker dialog failed', {cause: error})
	}
}

export async function generateDownload(options: {
	filename: string
	data: string
	mimeType: string
}): Promise<void> {
	const mimeType = options.mimeType || 'application/json'

	const {data} = options
	const blob = new Blob([data], {type: mimeType})

	const filename = `${options.filename}-${new Date().toISOString().slice(0, 10)}`

	if ('showSaveFilePicker' in window) {
		showDownloadDialog(filename, blob)
	} else {
		createDownloadLink(filename, blob)
	}
}

export async function guardedExport(options: {
	filename?: string
	mimeType?: string
	data: string
}): Promise<void> {
	const mimeType = options.mimeType || 'application/json'
	const filename = options.filename || 'cv-backup'

	const {data} = options

	const fullName = `${filename}-${new Date().toISOString().slice(0, 10)}`

	const parsed = JSON.parse(data)

	// Silent no-op if OPFS is empty — nothing to back up
	const isEmpty =
		Object.keys(parsed.content ?? {}).length === 0 &&
		(parsed.presets ?? []).length === 0

	if (isEmpty) return

	generateDownload({
		filename: fullName,
		data,
		mimeType,
	})
}
