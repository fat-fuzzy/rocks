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
}): Promise<void> {
	await seedBase(options.base.content)

	try {
		if (await isSeedComplete('backup')) return

		for (const [language, formats] of Object.entries(options.content)) {
			if (!isRecord(formats)) continue

			for (const [format, sections] of Object.entries(formats)) {
				if (!isRecord(sections)) continue

				const directoryHandle = await getDocsHandle({
					language,
					format,
					create: true,
				})

				for (const [sectionName, rawSection] of Object.entries(sections)) {
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
						id: crypto.randomUUID(),
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
	} catch {
		throw new Error('Error restoring from backup')
	}
	await markSeedComplete('backup')
}
