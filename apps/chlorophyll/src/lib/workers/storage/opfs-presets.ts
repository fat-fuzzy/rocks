/**
 * OPFS Operations: Presets
 */
import type {
	DocMeta,
	DocPath,
	OPFSDocumentTree,
	OPFSPresetTree,
	Preset,
} from '$types'
import {sanitizeFileName} from '$lib/common/sanitize'
import {parsePreset} from '$lib/common/transform/parse-or-throw'

import {
	getPresetsHandle,
	readDirectoryRecursive,
	deleteEntryRecursive,
} from '$lib/workers/storage/opfs-tools'

export async function loadPreset(options: {
	meta: DocMeta
	path: DocPath
}): Promise<{data: OPFSDocumentTree}> {
	const {path} = options
	const {filename, filetype} = path

	const opfsRoot = await navigator.storage.getDirectory()
	const parentHandle = await opfsRoot.getDirectoryHandle('presets')

	let _filename = `${filename}.${filetype}`

	// FIXME: handle filename error
	_filename = sanitizeFileName(_filename)
	const fh = await parentHandle.getFileHandle(_filename)
	const file = await fh.getFile()
	const serialized = await file.text()

	return {data: JSON.parse(serialized)}
}

export async function getPresetsData(): Promise<{data: OPFSPresetTree}> {
	const opfsRoot = await navigator.storage.getDirectory()

	let parentHandle

	try {
		parentHandle = await opfsRoot.getDirectoryHandle('presets')

		const data = await readDirectoryRecursive(parentHandle)

		return {
			data: data as OPFSPresetTree,
		}
	} catch (error) {
		const notFound = String(error).startsWith('NotFoundError:')
		if (notFound) {
			return {
				data: {},
			}
		}

		throw new Error('Load all presets failed', {cause: error})
	}
}

/**
 * Write API
 * @param filename
 * @param data file contents to save, stringified
 * @returns
 */
export async function savePreset(options: {
	meta: DocMeta
	path: DocPath
	preset: Preset
}): Promise<{id: string}> {
	const {meta, path, preset} = options
	const {filename, filetype} = path

	const parentHandle = await getPresetsHandle({parent: filename, create: true})

	const fileContent = `content.${filetype}`
	const fileMeta = `meta.${filetype}`

	// Stringify here — at the OPFS boundary
	let serialized

	let writable

	try {
		const parsed = parsePreset(`Preset ${preset.name}`, preset)

		serialized = JSON.stringify(parsed)
		let fh = await parentHandle.getFileHandle(fileContent, {create: true})
		writable = await fh.createWritable()
		await writable.write(serialized)
		await writable.close()

		serialized = JSON.stringify(meta)
		fh = await parentHandle.getFileHandle(fileMeta, {create: true})
		writable = await fh.createWritable()

		await writable.write(serialized)
		await writable.close()

		return {
			id: meta.id,
		}
	} catch (error) {
		await writable?.abort()
		throw new Error('Save preset failed', {cause: error})
	}
}

/**
 * Delete a preset
 * @param directoryHandle parent directory
 * @param data file contents to save, stringified
 * @returns
 */
export async function deletePreset(options: {
	meta: DocMeta
	path: DocPath
}): Promise<{deleted: boolean}> {
	const {path} = options
	const {filename, filetype} = path

	const parentHandle = await getPresetsHandle({parent: filename})

	const fileContent = `content.${filetype}`
	const fileMeta = `meta.${filetype}`

	if (parentHandle) {
		await parentHandle.removeEntry(fileContent)
		await parentHandle.removeEntry(fileMeta)
	}

	const presetsHandle = await getPresetsHandle({})

	if (presetsHandle) {
		await presetsHandle.removeEntry(filename)
	}
	// FIXME: handle delete error
	return {
		deleted: true,
	}
}

/**
 * Delete a file
 * @param data file contents to save, stringified
 * @returns
 */
export async function deletePresetRoot(options: {
	meta: DocMeta
	path: DocPath
}): Promise<{deleted: boolean}> {
	const {path} = options

	const opfsRoot = await navigator.storage.getDirectory()
	const presetsHandle = await opfsRoot.getDirectoryHandle('presets')

	if (presetsHandle) {
		// FIXME: sanitizeFileName filename
		await deleteEntryRecursive(presetsHandle, path)
		await opfsRoot.removeEntry('presets')
	}

	// FIXME: handle delete error
	return {
		deleted: true,
	}
}
