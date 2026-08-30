/**
 * OPFS Operations: User content
 */
import type {
	Slug,
	DocLanguage,
	DocMeta,
	DocPath,
	Section,
	Block,
	OPFSTreeDoc,
	Rank,
} from '$types'

import {sanitizeFileName} from '$lib/common/sanitize'
import {parseBlock, parseSection} from '$lib/common/transform/parse-or-throw'
import {
	isRawSection,
	rawSectionToSection,
} from '$lib/common/transform/opfs-to-doc'
import {
	getDocsHandle,
	saveEntry,
	deleteEntry,
	readDirectoryRecursive,
	deleteEntryRecursive,
	saveBlockToOPFS,
	saveSectionToOPFS,
} from '$lib/workers/storage/opfs-tools'

/**
 * Add new Language and clone content from source language
 * @param options
 * @returns created language slug
 */
export async function saveLanguage(options: {
	language: DocLanguage
	sourceLanguage: DocLanguage
	formats: Slug[]
}): Promise<{data: {language: DocLanguage}}> {
	const {language, sourceLanguage, formats} = options

	for (const format of formats) {
		await saveFormat({
			format,
			sourceFormat: formats[0], // TODO: test this
			formats,
			languages: [language],
		})
		const sourceDoc = await getContentDataForLanguage(sourceLanguage)

		await duplicateDocContent({
			language,
			format,
			opfsContent: sourceDoc.data,
		})
	}

	return {
		data: {
			language,
		},
	}
}

/**
 * Add new Format and clone content from source language
 * @param options
 * @returns created language slug
 */
export async function saveFormat(options: {
	format: Slug
	sourceFormat: Slug
	formats: Slug[]
	languages: DocLanguage[]
}): Promise<{data: {format: Slug}}> {
	const {format, sourceFormat, languages} = options

	for (const language of languages) {
		const sourceDoc = await getContentDataForFormat(language, sourceFormat)

		await duplicateDocContent({
			language,
			format,
			opfsContent: sourceDoc.data,
		})
	}

	return {
		data: {
			format,
		},
	}
}

/**
 * Duplicate directory content from source [language * format] in a new directory [language * format]
 * @param options
 */
async function duplicateDocContent(options: {
	language: DocLanguage
	format: Slug
	opfsContent: OPFSTreeDoc
}) {
	const {language, format, opfsContent} = options

	const targetParentHandle = await getDocsHandle({
		language,
		format,
		create: true,
	})

	const docMeta = {
		path: {filename: format, filetype: 'json'},
		meta: {
			id: crypto.randomUUID(),
			content_type: 'doc-root',
			name: `${language}-${format}`,
			label: `${language}-${format}`,
		},
	}
	const docContent = {
		id: crypto.randomUUID(),
		content_type: 'doc-root',
		name: `${language}-${format}`,
		label: `${language}-${format}`,
	}

	await saveEntry(targetParentHandle, docMeta, docContent)

	for (const sections of Object.values(opfsContent)) {
		for (const sectionData of Object.values(sections)) {
			let unsafeSection
			if (isRawSection(sectionData)) {
				unsafeSection = rawSectionToSection(sectionData)
			}

			if (unsafeSection) {
				unsafeSection.parentId = docMeta.meta.id

				const section = parseSection(
					`Section ${unsafeSection.name}`,
					unsafeSection,
				)

				await saveSectionToOPFS(targetParentHandle, section, 'json')
			}
		}
	}
}

/**
 * Read API
 * @param filename
 * @returns file contents
 */
export async function loadFile(options: {
	meta: DocMeta
	path: DocPath
}): Promise<{data: OPFSTreeDoc}> {
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
	format: Slug
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

	// FIXME:  clean return type inconsistencies
	return payload
}

export async function createSection(options: {
	name: Slug
	rank: Rank
	formats: Slug[]
	language: DocLanguage
	updateRanks: Section[]
	title?: string
}) {
	const {name, title, rank, formats, language, updateRanks} = options

	for (const format of formats) {
		// 1. Gather parent data
		const docHandle = await getDocsHandle({
			language,
			format,
		})
		const docRoot = 'content.json'
		const fh = await docHandle.getFileHandle(docRoot, {
			create: true,
		})

		const file = await fh.getFile()
		const serialized = await file.text()

		const docMeta = JSON.parse(serialized)

		// 2. Create the section folder
		const sectionId = crypto.randomUUID()

		const section: Section = {
			content_type: 'section',
			id: sectionId,
			name,
			title,
			rank,
			parentId: docMeta.id,
		}

		const parsed = parseSection(`Section ${name}`, section)

		await saveSection({language, format, section: parsed})
	}
	// 3. Update ranks of sections around, if necessary
	for (let i = 0; i < updateRanks.length; i++) {
		const toUpdate = updateRanks[i]
		toUpdate.rank = toUpdate.rank + 1

		for (const format of formats) {
			await saveSection({language, format, section: toUpdate})
		}
	}

	return {name: options.name}
}

export async function saveSection(options: {
	language: DocLanguage
	format: Slug
	section: Section
}) {
	const {language, format, section} = options
	const opfsOptions = language && format ? {language, format} : {language}

	const directoryHandle = await getDocsHandle(opfsOptions)
	const parsed = parseSection(`Section ${section.name}`, section)

	const payload = await saveSectionToOPFS(directoryHandle, parsed, 'json')

	return payload
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

export async function getContentData(): Promise<{data: OPFSTreeDoc}> {
	const opfsRoot = await navigator.storage.getDirectory()

	let parentHandle

	try {
		parentHandle = await opfsRoot.getDirectoryHandle('content')

		const data = await readDirectoryRecursive(parentHandle)

		return {
			data: data as OPFSTreeDoc,
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

export async function getContentDataForLanguage(
	language: DocLanguage,
): Promise<{
	data: OPFSTreeDoc
}> {
	const opfsRoot = await navigator.storage.getDirectory()

	let contentHandle
	let parentHandle

	try {
		contentHandle = await opfsRoot.getDirectoryHandle('content')
		parentHandle = await contentHandle.getDirectoryHandle(language, {
			create: true,
		})

		const data = await readDirectoryRecursive(parentHandle)

		return {
			data: data as OPFSTreeDoc,
		}
	} catch (error) {
		const notFound = String(error).startsWith('NotFoundError:')
		if (notFound) {
			return {
				data: {},
			}
		}

		throw new Error(`Load content failed for language: ${language}`, {
			cause: error,
		})
	}
}

export async function getContentDataForFormat(
	language: DocLanguage,
	format: Slug,
): Promise<{
	data: OPFSTreeDoc
}> {
	const opfsRoot = await navigator.storage.getDirectory()

	let contentHandle
	let languageHandle
	let formatHandle

	try {
		contentHandle = await opfsRoot.getDirectoryHandle('content')
		languageHandle = await contentHandle.getDirectoryHandle(language)
		formatHandle = await languageHandle.getDirectoryHandle(format, {
			create: true,
		})

		const data = await readDirectoryRecursive(formatHandle)

		return {
			data: data as OPFSTreeDoc,
		}
	} catch (error) {
		const notFound = String(error).startsWith('NotFoundError:')
		if (notFound) {
			return {
				data: {},
			}
		}

		throw new Error(`Load content failed for format: ${format}`, {cause: error})
	}
}
