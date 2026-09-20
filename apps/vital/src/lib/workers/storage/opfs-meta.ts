import type {FrontmatterBase, FrontmatterStructure, NamespaceId} from '$types'

import {
	saveEntry,
	getBaseHandle,
	getStructureHandle,
	readDirectoryRecursive,
} from '$lib/workers/storage/opfs-tools'

import {parseBase, parseStructure} from '$lib/common/transform/parse-or-throw'

export async function getBaseData(root: NamespaceId): Promise<{
	content: FrontmatterBase
	meta: {name: string}
}> {
	const parentHandle = await getBaseHandle({root})

	const base = (await readDirectoryRecursive(parentHandle)) as unknown as {
		content: FrontmatterBase
		meta: {name: string}
	}

	return base
}

export async function getStructureData(root: NamespaceId): Promise<{
	content: {structure: FrontmatterStructure[]}
	meta: {name: string}
}> {
	const parentHandle = await getStructureHandle({root})

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
export async function saveBase(options: {
	root: NamespaceId
	base: FrontmatterBase
}): Promise<FrontmatterBase | undefined> {
	const {root, base} = options

	try {
		const data = parseBase('Save Base', base)

		const directoryHandle = await getBaseHandle({root, create: true})
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
	root,
	structures,
}: {
	root: NamespaceId
	structures: FrontmatterStructure[]
}): Promise<FrontmatterStructure | undefined> {
	for (const structure of structures) {
		try {
			const data = parseStructure('Save Structures', structure)

			const directoryHandle = await getStructureHandle({root, create: true})
			await saveEntry(directoryHandle, {name: 'structure'}, data)

			return data
		} catch (error) {
			throw new Error('Error saving doc base', {cause: error})
		}
	}
}
