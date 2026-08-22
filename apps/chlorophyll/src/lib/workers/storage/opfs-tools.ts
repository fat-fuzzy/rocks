/**
 * OPFS Operations
 */

import type {FileExt, DocPath, Section, Block, SeedType} from '$types'

import {sanitizeFileName} from '$lib/common/sanitize'

const SEED_TYPES: SeedType[] = ['root', 'backup', 'base', 'structure']

export const OPFS_FOLDERS: {[key in SeedType]: string[]} = {
	root: ['content', 'presets', 'base', 'structure'],
	base: ['base'],
	structure: ['structure'],
	backup: ['content', 'presets', 'base', 'structure'],
}

/**
 * Get the deepest nested folder handle for given doc
 * @param filename
 * @returns file contents
 */
export async function getDocsHandle(options: {
	language?: string
	format?: string
	parent?: string
	create?: boolean
}) {
	const {language, format, parent, create} = options
	const opfsRoot = await navigator.storage.getDirectory()
	const contentHandle = await opfsRoot.getDirectoryHandle('content', {
		create,
	})

	let parentHandle = contentHandle
	let languageHandle
	let formatHandle
	let sectionHandle

	if (language) {
		languageHandle = await parentHandle.getDirectoryHandle(language, {
			create,
		})

		if (languageHandle) {
			parentHandle = languageHandle
		}
	}

	if (format) {
		formatHandle = await parentHandle.getDirectoryHandle(format, {
			create,
		})

		if (formatHandle) {
			parentHandle = formatHandle
		}
	}

	if (parent) {
		const pathParts = parent.split('/').filter((part) => part)

		for (const part of pathParts) {
			sectionHandle = await parentHandle.getDirectoryHandle(part, {
				create,
			})
			if (sectionHandle) {
				parentHandle = sectionHandle
			}
		}
	}

	return parentHandle
}

/**
 * Get the folder handle for the base metadata for docs
 * @param filename
 * @returns file contents
 */
export async function getBaseHandle(options: {
	parent?: string
	create?: boolean
}) {
	const {parent, create} = options
	const opfsRoot = await navigator.storage.getDirectory()
	const contentHandle = await opfsRoot.getDirectoryHandle('base', {
		create,
	})

	let parentHandle = contentHandle
	let baseHandle

	if (parent) {
		baseHandle = await parentHandle.getDirectoryHandle(parent, {
			create,
		})
		if (baseHandle) {
			parentHandle = baseHandle
		}
	}

	return parentHandle
}

/**
 * Get the folder handle for the structure metadata for docs
 * @param filename
 * @returns file contents
 */
export async function getStructureHandle(options: {
	parent?: string
	create?: boolean
}) {
	const {parent, create} = options
	const opfsRoot = await navigator.storage.getDirectory()
	const contentHandle = await opfsRoot.getDirectoryHandle('structure', {
		create,
	})

	let parentHandle = contentHandle
	let baseHandle

	if (parent) {
		baseHandle = await parentHandle.getDirectoryHandle(parent, {
			create,
		})
		if (baseHandle) {
			parentHandle = baseHandle
		}
	}

	return parentHandle
}

/**
 * Get the deepest nested folder handle for given preset
 * @param filename
 * @returns file contents
 */
export async function getPresetsHandle(options: {
	parent?: string
	create?: boolean
}) {
	const {parent, create} = options
	const opfsRoot = await navigator.storage.getDirectory()
	const contentHandle = await opfsRoot.getDirectoryHandle('presets', {
		create,
	})

	let parentHandle = contentHandle
	let presetHandle

	if (parent) {
		presetHandle = await parentHandle.getDirectoryHandle(parent, {
			create,
		})
		if (presetHandle) {
			parentHandle = presetHandle
		}
	}

	return parentHandle
}

/**
 * Recursively list the contents of a folder and all subfolders
 * src: https://web.dev/articles/origin-private-file-system#recursively_list_the_contents_of_a_folder_and_all_subfolders
 * @param directoryHandle
 * @param relativePath
 * @returns
 */
export async function getDirectoryEntriesRecursive(
	directoryHandle: FileSystemDirectoryHandle,
	relativePath = '.',
) {
	const fileHandles = []
	const directoryHandles = []
	const entries: {
		[name: string]: FileSystemDirectoryHandle | FileSystemHandle
	} = {}
	// Get an iterator of the files and folders in the directory.

	const directoryIterator = directoryHandle.values()
	const directoryEntryPromises = []
	for await (const handle of directoryIterator) {
		const nestedPath = `${relativePath}/${handle.name}`
		if (handle.kind === 'file') {
			fileHandles.push({handle, nestedPath})
			directoryEntryPromises.push(
				handle.getFile().then((file: File) => {
					return {
						name: handle.name,
						kind: handle.kind,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
						relativePath: nestedPath,
						handle,
					}
				}),
			)
		} else if (handle.kind === 'directory') {
			directoryHandles.push({handle, nestedPath})
			directoryEntryPromises.push(
				(async () => {
					return {
						name: handle.name,
						kind: handle.kind,
						relativePath: nestedPath,
						entries: await getDirectoryEntriesRecursive(handle, nestedPath),
						handle,
					}
				})(),
			)
		}
	}

	const directoryEntries = await Promise.all(directoryEntryPromises)
	// eslint-disable-next-line
	directoryEntries.forEach((directoryEntry: any) => {
		entries[directoryEntry.name] = directoryEntry
	})
	return entries
}

/**
 * Delete a OPFS file entry
 * @param directoryHandle parent directory
 * @returns
 */
export async function deleteEntry(
	directoryHandle: FileSystemDirectoryHandle,
	path: DocPath,
): Promise<void> {
	const {filename} = path
	const _filename = sanitizeFileName(filename)
	const parentHandle = await directoryHandle.getDirectoryHandle(_filename)
	await deleteDirectoryRecursive(parentHandle)
}

/**
 * Save a OPFS file entry
 * @param directoryHandle parent directory
 * @returns
 */
export async function saveEntry(
	directoryHandle: FileSystemDirectoryHandle,
	meta: object,
	data: object,
): Promise<{saved: boolean}> {
	const fileContent = `content.json`
	const fileMeta = `meta.json`

	// Stringify here — at the OPFS boundary
	const serialized = JSON.stringify(data)
	let writable
	let fh

	try {
		fh = await directoryHandle.getFileHandle(fileContent, {create: true})
		writable = await fh.createWritable()
		await writable.write(serialized)
		await writable.close()
		fh = await directoryHandle.getFileHandle(fileMeta, {create: true})
		writable = await fh.createWritable()
		await writable.write(JSON.stringify(meta))
		await writable.close()

		return {
			saved: true,
		}
	} catch (error) {
		await writable?.abort() // release the lock on failure
		throw error
	}
}

/**
 * Save a OPFS Block entry
 * @param directoryHandle parent directory
 * @returns
 */
export async function saveBlockToOPFS(
	directoryHandle: FileSystemDirectoryHandle,
	data: Block,
	filetype: FileExt,
): Promise<{id: string}> {
	const {id, name, group, rank, content, tags, parentId} = data

	const filename = sanitizeFileName(name)
	let parentHandle = directoryHandle

	// Use group to store nested sections under one folder
	if (group) {
		parentHandle = await directoryHandle.getDirectoryHandle(group, {
			create: true,
		})
	}

	const filenameHandle = await parentHandle.getDirectoryHandle(filename, {
		create: true,
	})

	const fileContent = `content.${filetype}`
	const fileMeta = `meta.${filetype}`

	// Stringify here — at the OPFS boundary
	let serialized

	let writable
	let fh

	try {
		serialized = JSON.stringify(content)

		fh = await filenameHandle.getFileHandle(fileContent, {create: true})
		writable = await fh.createWritable()
		await writable.write(serialized)
		await writable.close()

		serialized = JSON.stringify({
			id,
			name,
			group,
			rank,
			tags,
			parentId,
		})
		fh = await filenameHandle.getFileHandle(fileMeta, {create: true})
		writable = await fh.createWritable()
		await writable.write(serialized)
		await writable.close()

		return {id}
	} catch (error) {
		await writable?.abort() // release the lock on failure
		throw error
	}
}

/**
 * Save a OPFS Section entry
 * @param directoryHandle parent directory
 * @returns
 */
export async function saveSectionToOPFS(
	directoryHandle: FileSystemDirectoryHandle,
	data: Section,
	filetype: 'json' | 'md',
): Promise<{id: string}> {
	const {id, name, rank, content, parentId} = data

	const filename = sanitizeFileName(name)

	const filenameHandle = await directoryHandle.getDirectoryHandle(filename, {
		create: true,
	})

	const fileContent = `content.${filetype}`
	const fileMeta = `meta.${filetype}`

	// Stringify here — at the OPFS boundary
	let serialized

	let writable
	let fh

	try {
		serialized = JSON.stringify(data)

		fh = await filenameHandle.getFileHandle(fileContent, {create: true})
		writable = await fh.createWritable()
		await writable.write(serialized)
		await writable.close()

		serialized = JSON.stringify({
			id,
			name,
			rank,
			content,
			parentId,
		})
		fh = await filenameHandle.getFileHandle(fileMeta, {create: true})
		writable = await fh.createWritable()
		await writable.write(serialized)
		await writable.close()

		return {id}
	} catch (error) {
		await writable?.abort() // release the lock on failure
		throw error
	}
}

/**
 * Delete a nested OPFS file entry
 * @param directoryHandle parent directory
 * @returns
 */
export async function deleteEntryRecursive(
	directoryHandle: FileSystemDirectoryHandle,
	path: DocPath,
): Promise<void> {
	// TODO
	await directoryHandle.removeEntry(path.filename)
}

/**
 * Returns a nested object mirroring your OPFS folder structure
 * @param directoryHandle parent directory
 */
export async function readDirectoryRecursive(
	directoryHandle: FileSystemDirectoryHandle,
): Promise<Record<string, unknown>> {
	const result: Record<string, unknown> = {}

	for await (const [name, entry] of directoryHandle.entries()) {
		const filename = sanitizeFileName(name)

		if (entry.kind === 'file') {
			const file = await entry.getFile()
			const serialized = await file.text()
			const key = filename.replace(/\.json$/, '')

			// Parse here — we're crossing the OPFS boundary inward
			if (key && serialized) {
				try {
					result[key] = JSON.parse(serialized)
				} catch (error) {
					console.warn(`Skipping unparseable file: ${filename}`, error)
				}
			}
		} else if (entry.kind === 'directory') {
			result[filename] = await readDirectoryRecursive(
				entry as FileSystemDirectoryHandle,
			)
		}
	}

	return result
}

/**
 * Returns a nested object mirroring your OPFS folder structure
 * @param directoryHandle parent directory
 */
export async function deleteDirectoryRecursive(
	directoryHandle: FileSystemDirectoryHandle,
): Promise<Record<string, unknown>> {
	const result: Record<string, unknown> = {}

	for await (const [name, entry] of directoryHandle.entries()) {
		if (entry.kind === 'file') {
			try {
				await directoryHandle.removeEntry(name)
			} catch (error) {
				// NotFoundError is fine — nothing to clear
				const notFound = String(error).startsWith('NotFoundError:')
				if (!notFound)
					throw new Error('Recursive delete failed', {cause: error})
			}
		} else if (entry.kind === 'directory') {
			await deleteDirectoryRecursive(entry as FileSystemDirectoryHandle)

			try {
				await directoryHandle.removeEntry(name)
			} catch (error) {
				// NotFoundError is fine — nothing to clear
				const notFound = String(error).startsWith('NotFoundError:')
				if (!notFound)
					throw new Error('Recursive delete failed', {cause: error})
			}
		}
	}

	return result
}

export async function deleteAllContent(): Promise<{
	status: string
	errors: string[]
}> {
	const opfsRoot = await navigator.storage.getDirectory()
	const errors = []
	for (const name of SEED_TYPES) {
		try {
			const flagName = `seed-${name}-complete.json`

			await opfsRoot.removeEntry(flagName)
		} catch {
			errors.push(name)
			console.log(`deleteAllContent: Error deleting seed file ${name}`)
		}

		try {
			const opfsFolders = OPFS_FOLDERS[name]

			for (const folder of opfsFolders) {
				const directoryHandle = await opfsRoot.getDirectoryHandle(folder)
				await deleteDirectoryRecursive(directoryHandle)
			}
		} catch {
			errors.push(name)
			console.log(`deleteAllContent: Error deleting seed folder ${name}`)
		}
	}

	return {
		status: errors.length ? 'error' : 'ok',
		errors,
	}
}
