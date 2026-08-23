import type {FrontmatterBase, FrontmatterStructure} from '$types'

import {
	saveEntry,
	getBaseHandle,
	getStructureHandle,
	readDirectoryRecursive,
} from '$lib/workers/storage/opfs-tools'

import {parseBase, parseStructure} from '$lib/common/transform/parse-or-throw'

export async function getBaseData(): Promise<{
	content: FrontmatterBase
	meta: {name: string}
}> {
	const parentHandle = await getBaseHandle({})

	const base = (await readDirectoryRecursive(parentHandle)) as unknown as {
		content: FrontmatterBase
		meta: {name: string}
	}

	return base
}

export async function getStructureData(): Promise<{
	content: {structure: FrontmatterStructure[]}
	meta: {name: string}
}> {
	const parentHandle = await getStructureHandle({})

	const data = (await readDirectoryRecursive(parentHandle)) as unknown as {
		content: {
			structure: FrontmatterStructure[]
		}
		meta: {name: string}
	}

	return data
}

/**
 * Save doc base to OPFS
 * @returns void
 */
export async function saveBase(
	base: FrontmatterBase,
): Promise<FrontmatterBase | undefined> {
	try {
		const data = parseBase('Save Base', base)

		const directoryHandle = await getBaseHandle({create: true})
		await saveEntry(directoryHandle, {name: 'base'}, data)

		return data
	} catch (error) {
		throw new Error('Error saving doc base', {cause: error})
	}
}

/**
 * Save doc structure to OPFS
 * @returns void
 */
export async function saveStructure({
	structures,
}: {
	structures: FrontmatterStructure[]
}): Promise<FrontmatterStructure | undefined> {
	for (const structure of structures) {
		try {
			const data = parseStructure('Save Structures', structure)

			const directoryHandle = await getStructureHandle({create: true})
			await saveEntry(directoryHandle, {name: 'structure'}, data)

			return data
		} catch (error) {
			throw new Error('Error saving doc base', {cause: error})
		}
	}
}
