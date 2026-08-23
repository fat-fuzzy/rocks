/**
 * SEED workflow
 * On install
 * - Initial load from markdown files
 * - Saved to OPFS (worker process)
 * On subsequent loads
 * - Load data from OPFS (user modified)
 * After clearing data / on demand
 * - Load from Markdown seed OR from JSON data export
 */

import type {
	OPFSTreeBase,
	Doc,
	FrontmatterBase,
	OPFSTreeDoc,
	OPFSTreePreset,
	SeedDoc,
	SeedType,
	FrontmatterStructure,
	OPFSTreeStructure,
} from '$types'

import {
	isRecord,
	isRawSection,
	isRawPreset,
	isSection,
} from '$lib/common/transform/opfs-to-doc'

import {seedDocToDoc} from '$lib/common/transform/seed-to-doc'

import {
	parseSection,
	parseBase,
	parseStructure,
} from '$lib/common/transform/parse-or-throw'

import {
	getBaseHandle,
	getStructureHandle,
	getDocsHandle,
	getPresetsHandle,
	saveSectionToOPFS,
	saveEntry,
} from '$lib/workers/storage/opfs-tools'

import {savePreset} from '$lib/workers/storage/opfs'

export async function isSeedComplete(
	type: SeedType,
): Promise<{seeded: number} | boolean> {
	const flagName = `seed-${type}-complete.json`
	const opfsRoot = await navigator.storage.getDirectory()
	try {
		await opfsRoot.getFileHandle(flagName)
		const fh = await opfsRoot.getFileHandle(flagName)

		const file = await fh.getFile()
		const result = await file.text()
		return JSON.parse(result)
	} catch {
		return false
	}
}

async function markSeedComplete(type: SeedType) {
	const opfsRoot = await navigator.storage.getDirectory()

	// Stringify here - OPFS write boundary
	const serialized = JSON.stringify({
		date_seed: new Date().toISOString(),
		source: type,
	})
	const flagName = `seed-${type}-complete.json`

	let writable
	let fh

	try {
		fh = await opfsRoot.getFileHandle(flagName, {create: true})
		writable = await fh.createWritable()
		await writable.write(serialized)
		await writable.close()

		fh = await opfsRoot.getFileHandle(flagName)
	} catch (error) {
		await writable?.abort() // release the lock on failure
		throw error
	}
}

/**
 * Loads seed cv data from markdown content and saves it to OPFS
 * @returns void
 */
export async function seedRoot(seed: SeedDoc[]): Promise<void> {
	if (await isSeedComplete('root')) return

	try {
		for (let i = 0; i < seed.length; i++) {
			const doc: Doc = seedDocToDoc(seed[i])
			const {schema_version, id, path, meta, sections} = doc
			const {language, format} = meta

			// 0. Prepare: ensure language and format folders exist

			const opfsOptions = language && format ? {language, format} : {language}

			const directoryHandle = await getDocsHandle({
				...opfsOptions,
				create: true,
			})

			// Create empty presets folder
			await getPresetsHandle({create: true})

			for (const sectionData of sections) {
				const section = parseSection(`Section ${sectionData.name}`, sectionData)

				await saveSectionToOPFS(directoryHandle, section, 'json')
			}

			// FIXME: save as meta.json
			await saveEntry(
				directoryHandle,
				{language, format, name: 'doc-root'},
				{schema_version, id, path},
			)
		}
	} catch {
		throw new Error('Error seeding doc root')
	}

	await markSeedComplete('root')
}

/**
 * Loads seed cv base from markdown and saves it to OPFS
 * @returns void
 */
export async function seedBase(base: FrontmatterBase): Promise<void> {
	if (await isSeedComplete('base')) return

	try {
		const data = parseBase('OPFS Seed Base', base)

		const directoryHandle = await getBaseHandle({create: true})
		await saveEntry(directoryHandle, {name: 'base'}, data)
	} catch (error) {
		throw new Error('Error seeding doc base', {cause: error})
	}
	await markSeedComplete('base')
}

/**
 * Loads seed cv structure from markdown and saves it to OPFS
 * @returns void
 */
export async function seedStructure(options: {
	structures: FrontmatterStructure[]
}): Promise<void> {
	if (await isSeedComplete('structure')) return

	try {
		const {structures} = options

		const toSeed = []

		for (const structure of structures) {
			const data = parseStructure('OPFS Seed Structure', structure)
			toSeed.push(data)
		}

		const directoryHandle = await getStructureHandle({create: true})
		await saveEntry(directoryHandle, {name: 'structure'}, {structure: toSeed})
	} catch (error) {
		throw new Error('Error seeding doc structure', {cause: error})
	}

	await markSeedComplete('structure')
}

export async function restoreFromBackup(options: {
	content: OPFSTreeDoc
	presets: OPFSTreePreset
	base: OPFSTreeBase
	structure: OPFSTreeStructure
}): Promise<void> {
	await seedBase(options.base.content)
	await seedStructure({structures: options.structure.content.structure})

	try {
		if (await isSeedComplete('root')) return

		for (const [language, languageTree] of Object.entries(options.content)) {
			if (!isRecord(languageTree)) continue

			for (const [format, formatContent] of Object.entries(languageTree)) {
				if (!isRecord(formatContent)) continue

				const data = {language, format, name: `${language}-${format}`}
				const directoryHandle = await getDocsHandle({
					language,
					format,
					create: true,
				})

				// 2. Save sections in [language * format]
				for (const [sectionName, rawSection] of Object.entries(formatContent)) {
					if (sectionName === 'meta' || sectionName === 'content') {
						// 1. Save metadata for [language * format]
						const meta = {
							id: `${language}-${format}`,
							path: {filename: `${language}-${format}`, filetype: 'json'},
						}

						await saveEntry(directoryHandle, meta, data)
					}

					if (isRawSection(rawSection)) {
						const {content} = rawSection
						if (content.content_type) {
							const section = parseSection(
								`OPFS from Backup Section: ${sectionName}`,
								content,
							)

							await saveSectionToOPFS(directoryHandle, section, 'json')
						}
					} else if (isSection(rawSection)) {
						const section = parseSection(
							`OPFS from Backup Section: ${sectionName}`,
							rawSection,
						)

						await saveSectionToOPFS(directoryHandle, section, 'json')
					}
				}
			}

			// FIXME: save doc meta (see seedRoot function above)
		}

		await getPresetsHandle({create: true})

		for (const [presetName, rawPreset] of Object.entries(options.presets)) {
			if (!isRecord(rawPreset)) continue

			if (isRawPreset(rawPreset)) {
				const {content} = rawPreset

				await savePreset({
					meta: {
						id: content.id,
						content_type: 'preset',
						label: presetName,
						name: presetName,
					},
					path: {
						filename: presetName,
						filetype: 'json',
					},
					preset: content,
				})
			}
		}
	} catch (error) {
		console.log(error)

		throw new Error('Error restoring from backup', {cause: error})
	}
	await markSeedComplete('root')
}
