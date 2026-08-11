/**
 * OPFS Operations: User content
 */
import type {
	DocFormat,
	DocLanguage,
	DocMeta,
	DocPath,
	Section,
	Block,
	Prose,
	OPFSDocumentTree,
	Slug,
	Rank,
} from '$types'

import {sanitizeFileName} from '$lib/common/sanitize'
import {parseBlock, parseSection} from '$lib/common/transform/parse-or-throw'
import {
	getDocsHandle,
	getStructureHandle,
	saveEntry,
	deleteEntry,
	readDirectoryRecursive,
	deleteEntryRecursive,
	saveBlockToOPFS,
	saveSectionToOPFS,
} from '$lib/workers/storage/opfs-tools'

import {getBaseData, getStructureData} from '$lib/workers/storage/opfs-meta'

/**
 * Read API
 * @param filename
 * @returns file contents
 */
export async function loadFile(options: {
	meta: DocMeta
	path: DocPath
}): Promise<{data: OPFSDocumentTree}> {
	const {meta, path} = options
	const {language, format} = meta
	const {filename, filetype, parent} = path

	const parentHandle = await getDocsHandle({language, format, parent})

	let _filename = `${filename}.${filetype}`

	// FIXME: handle filename error
	_filename = sanitizeFileName(_filename)

	const fh = await parentHandle.getFileHandle(_filename)
	const file = await fh.getFile()
	const serialized = await file.text()

	return {
		data: JSON.parse(serialized),
	}
}

/**
 * Update Block data
 * @param options
 * @returns
 */
export async function saveBlock(options: {
	language: DocLanguage
	format: DocFormat
	block: Block
	path: DocPath
}): Promise<{id: string}> {
	const {language, format, block, path} = options
	const {filetype, parent} = path

	const parentHandle = await getDocsHandle({
		language,
		format,
		parent,
		create: true,
	})

	const parsed = parseBlock(`Block ${block.name}`, block)

	const payload = await saveBlockToOPFS(parentHandle, parsed, filetype)

	return payload
}

export async function createSection(options: {
	name: Slug
	rank: Rank
	formats: DocFormat[]
	updateRanks: Section[]
	title?: string
}) {
	const {name, title, rank, updateRanks} = options

	const baseData = await getBaseData()
	const structureData = await getStructureData()

	const base = baseData.content
	const structures = structureData.content.structure

	const structureUpdated: {[key in DocFormat]?: boolean} = {}
	let sections: string[] = []
	const structuresToUpdate = []

	for (const format of options.formats) {
		const structureToUpdate = structures.find((s) => s.format === format)

		if (!structureToUpdate) {
			throw new Error(
				`Error creating section: missing doc structure for ${format}`,
			)
		}

		if (!structureUpdated[format]) {
			if (structureToUpdate.sections.find((s) => s === name)) {
				throw new Error(
					`Error creating section: a section named ${name} already exists`,
				)
			}

			sections = [...structureToUpdate.sections]

			// Insert section at rank
			// TODO: factor out this code to helper fn
			if (rank >= sections.length) {
				sections.push(name)
			} else if (rank <= 1) {
				sections.unshift(name)
			} else {
				const precedingSections = sections.splice(0, rank - 1)
				precedingSections.push(name)
				sections = precedingSections.concat(sections)
			}

			// TODO:
			// 1. Update CV structure [DONE]
			// 1.bis Update Main Sections menu
			// 2. Update section indices (insert before / after) [DONE]
			// 2.bis UI-side: refresh index

			structureUpdated[format] = true
		}

		for (const language of base.languages) {
			const docHandle = await getDocsHandle({language, format})
			const docRoot = 'content.json'
			const fh = await docHandle.getFileHandle(docRoot)
			const file = await fh.getFile()
			const serialized = await file.text()

			const docMeta = JSON.parse(serialized)

			const section: Section = {
				content_type: 'section',
				id: crypto.randomUUID(),
				name,
				title,
				rank,
				parentId: docMeta.id,
			}

			const parsed = parseSection(`Section ${name}`, section)

			await saveSection({language, format, section: parsed})
		}

		structureToUpdate.sections = sections
		structuresToUpdate.push(structureToUpdate)
	}

	// TODO: factor out this code to helper fn
	for (let i = 0; i < updateRanks.length; i++) {
		const toUpdate = updateRanks[i]
		toUpdate.rank = toUpdate.rank + 1

		for (const format of base.formats) {
			for (const language of base.languages) {
				await saveSection({language, format, section: toUpdate})
			}
		}
	}

	const structureHandle = await getStructureHandle({create: true})
	await saveEntry(
		structureHandle,
		{name: 'structure'},
		{structure: structuresToUpdate},
	)

	return {name: options.name}
}

export async function saveSection(options: {
	language: DocLanguage
	format: DocFormat
	section: Section
}) {
	// 0. Prepare: ensure language and format folders exist

	const {language, format, section} = options
	const opfsOptions = language && format ? {language, format} : {language}

	const directoryHandle = await getDocsHandle(opfsOptions)
	const parsed = parseSection(`Section ${section.name}`, section)

	const payload = await saveSectionToOPFS(directoryHandle, parsed, 'json')

	return payload
}

/**
 * Write API
 * @param filename
 * @param data file contents to save, stringified
 * @returns
 */
export async function saveDocument(options: {
	meta: DocMeta
	path: DocPath
	content: Prose
}): Promise<{id: string}> {
	const {meta, path, content} = options
	const {language, format} = meta
	const {filename, filetype, parent} = path

	const parentHandle = await getDocsHandle({
		language,
		format,
		parent,
		create: true,
	})

	const dirName = sanitizeFileName(filename)

	const directoryHandle = await parentHandle.getDirectoryHandle(dirName, {
		create: true,
	})

	const fileContent = `content.${filetype}`
	const fileMeta = `meta.${filetype}`

	// Stringify here — at the OPFS boundary
	let serialized

	let writable
	let fh

	try {
		// Save content
		serialized = JSON.stringify(content)
		fh = await directoryHandle.getFileHandle(fileContent, {create: true})
		writable = await fh.createWritable()
		await writable.write(serialized)
		await writable.close()

		// Save meta
		serialized = JSON.stringify(meta)
		fh = await directoryHandle.getFileHandle(fileMeta, {create: true})
		writable = await fh.createWritable()
		await writable.write(serialized)
		await writable.close()

		return {
			id: meta.id,
		}
	} catch (error) {
		await writable?.abort() // release the lock on failure
		throw error
	}
}

/**
 * Clear entire content folder in OPFS
 * @param directoryHandle parent directory
 * @param filename
 * @returns
 */
export async function deleteContentFolder(options: {
	meta: DocMeta
	path: DocPath
}): Promise<{deleted: boolean}> {
	const {path} = options

	const opfsRoot = await navigator.storage.getDirectory()
	const parentHandle = await opfsRoot.getDirectoryHandle('content')

	if (parentHandle) {
		await deleteEntryRecursive(parentHandle, path)
		await opfsRoot.removeEntry('content')
	}

	return {
		deleted: true,
	}
}

/**
 * Delete a file
 * @param directoryHandle parent directory
 * @param data file contents to save, stringified
 * @returns
 */
export async function deleteContentFile(options: {
	meta: DocMeta
	path: DocPath
}): Promise<{deleted: boolean}> {
	const {path} = options

	const opfsRoot = await navigator.storage.getDirectory()
	const parentHandle = await opfsRoot.getDirectoryHandle('content')

	if (parentHandle) {
		await deleteEntry(parentHandle, path)
		await opfsRoot.removeEntry('content')
	}

	// FIXME: handle delete error

	return {
		deleted: true,
	}
}

export async function getContentData(): Promise<{data: OPFSDocumentTree}> {
	const opfsRoot = await navigator.storage.getDirectory()

	let parentHandle

	try {
		parentHandle = await opfsRoot.getDirectoryHandle('content')

		const data = await readDirectoryRecursive(parentHandle)

		return {
			data: data as OPFSDocumentTree,
		}
	} catch (error) {
		const notFound = String(error).startsWith('NotFoundError:')
		if (notFound) {
			return {
				data: {},
			}
		}

		throw new Error('Load all content failed', {cause: error})
	}
}
