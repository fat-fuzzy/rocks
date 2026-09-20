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
	NamespaceId,
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
	getRootHandle,
} from '$lib/workers/storage/opfs-tools'

/**
 * Add new Language and clone content from source language
 * @param options
 * @returns created language slug
 */
export async function saveLanguage(options: {
	root: NamespaceId
	language: DocLanguage
	sourceLanguage: DocLanguage
	formats: Slug[]
}): Promise<{data: {language: DocLanguage}}> {
	const {root, language, sourceLanguage, formats} = options

	try {
		for (const format of formats) {
			await saveFormat({
				root,
				format,
				sourceFormat: formats[0], // TODO: test this
				formats,
				languages: [language],
			})
			const sourceDoc = await getContentDataForLanguage(root, sourceLanguage)

			await duplicateDocContent({
				root,
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
	} catch (error) {
		throw new Error('Save block failed', {cause: error})
	}
}

/**
 * Add new Format and clone content from source language
 * @param options
 * @returns created language slug
 */
export async function saveFormat(options: {
	root: NamespaceId
	format: Slug
	sourceFormat: Slug
	formats: Slug[]
	languages: DocLanguage[]
}): Promise<{data: {format: Slug}}> {
	const {root, format, sourceFormat, languages} = options

	try {
		for (const language of languages) {
			const sourceDoc = await getContentDataForFormat(
				root,
				language,
				sourceFormat,
			)

			await duplicateDocContent({
				root,
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
	} catch (error) {
		throw new Error('Save block failed', {cause: error})
	}
}

/**
 * Duplicate directory content from source [language * format] in a new directory [language * format]
 * @param options
 */
async function duplicateDocContent(options: {
	root: NamespaceId
	language: DocLanguage
	format: Slug
	opfsContent: OPFSTreeDoc
}) {
	const {root, language, format, opfsContent} = options

	try {
		const targetParentHandle = await getDocsHandle({
			root,
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
	} catch (error) {
		throw new Error('Save block failed', {cause: error})
	}
}

/**
 * Read API
 * @param filename
 * @returns file contents
 */
export async function loadFile(options: {
	root: NamespaceId
	meta: DocMeta
	path: DocPath
}): Promise<{data: OPFSTreeDoc}> {
	const {root, meta, path} = options
	const {language, format} = meta
	const {filename, filetype, parent} = path

	try {
		const parentHandle = await getDocsHandle({root, language, format, parent})

		let _filename = `${filename}.${filetype}`

		// FIXME: handle filename error
		_filename = sanitizeFileName(_filename)

		const fh = await parentHandle.getFileHandle(_filename)
		const file = await fh.getFile()
		const serialized = await file.text()

		return {
			data: JSON.parse(serialized),
		}
	} catch (error) {
		throw new Error('Save block failed', {cause: error})
	}
}

/**
 * Update Block data
 * @param options
 * @returns
 */
export async function saveBlock(options: {
	root: NamespaceId
	language: DocLanguage
	format: Slug
	block: Block
	path: DocPath
}): Promise<{id: string}> {
	const {root, language, format, block, path} = options
	const {filetype, parent} = path

	try {
		const parentHandle = await getDocsHandle({
			root,
			language,
			format,
			parent,
			create: true,
		})

		const parsed = parseBlock(`Block ${block.name}`, block)

		const payload = await saveBlockToOPFS(parentHandle, parsed, filetype)

		// FIXME:  clean return type inconsistencies
		return payload
	} catch (error) {
		throw new Error('Save block failed', {cause: error})
	}
}

export async function createSection(options: {
	root: NamespaceId
	name: Slug
	rank: Rank
	formats: Slug[]
	language: DocLanguage
	updateRanks: Section[]
	title?: string
}) {
	const {root, name, title, rank, formats, language, updateRanks} = options

	try {
		for (const format of formats) {
			// 1. Gather parent data
			const docHandle = await getDocsHandle({
				root,
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

			await saveSection({root, language, format, section: parsed})
		}
		// 3. Update ranks of sections around, if necessary
		for (let i = 0; i < updateRanks.length; i++) {
			const toUpdate = updateRanks[i]
			toUpdate.rank = toUpdate.rank + 1

			for (const format of formats) {
				await saveSection({root, language, format, section: toUpdate})
			}
		}

		return {name: options.name}
	} catch (error) {
		throw new Error('Create section failed', {cause: error})
	}
}

export async function saveSection(options: {
	root: NamespaceId
	language: DocLanguage
	format: Slug
	section: Section
}) {
	const {root, language, format, section} = options
	const opfsOptions =
		language && format ? {root, language, format} : {root, language}

	try {
		const directoryHandle = await getDocsHandle(opfsOptions)
		const parsed = parseSection(`Section ${section.name}`, section)

		const payload = await saveSectionToOPFS(directoryHandle, parsed, 'json')

		return payload
	} catch (error) {
		throw new Error('Save section failed', {cause: error})
	}
}

/**
 * Clear entire content folder in OPFS
 * @param directoryHandle parent directory
 * @param filename
 * @returns
 */
export async function deleteContentFolder(options: {
	root: NamespaceId
	meta: DocMeta
	path: DocPath
}): Promise<{deleted: boolean}> {
	const {root, path} = options

	try {
		const opfsRoot = await getRootHandle({name: root})

		const parentHandle = await opfsRoot.getDirectoryHandle('content')

		if (parentHandle) {
			await deleteEntryRecursive(parentHandle, path)
			await opfsRoot.removeEntry('content')
		}

		return {
			deleted: true,
		}
	} catch (error) {
		throw new Error('Delete content folder failed', {cause: error})
	}
}

/**
 * Delete a file
 * @param directoryHandle parent directory
 * @param data file contents to save, stringified
 * @returns
 */
export async function deleteContentFile(options: {
	root: NamespaceId
	meta: DocMeta
	path: DocPath
}): Promise<{deleted: boolean}> {
	const {root, path} = options

	try {
		const opfsRoot = await getRootHandle({name: root})
		const parentHandle = await opfsRoot.getDirectoryHandle('content')

		if (parentHandle) {
			await deleteEntry(parentHandle, path)
			await opfsRoot.removeEntry('content')
		}
		return {
			deleted: true,
		}
	} catch (error) {
		throw new Error('Delete content file failed', {cause: error})
	}
}

export async function getContentData(
	root: NamespaceId,
): Promise<{data: OPFSTreeDoc}> {
	let parentHandle

	try {
		const opfsRoot = await getRootHandle({name: root})
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
	root: NamespaceId,
	language: DocLanguage,
): Promise<{
	data: OPFSTreeDoc
}> {
	let contentHandle
	let parentHandle

	try {
		const opfsRoot = await getRootHandle({name: root})
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
	root: NamespaceId,
	language: DocLanguage,
	format: Slug,
): Promise<{
	data: OPFSTreeDoc
}> {
	let contentHandle
	let languageHandle
	let formatHandle

	try {
		const opfsRoot = await getRootHandle({name: root})
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
