import type {FrontmatterBase, FrontmatterStructure} from '$types'

import {
	saveEntry,
	getBaseHandle,
	getStructureHandle,
	readDirectoryRecursive,
} from '$lib/workers/storage/opfs-tools'

import {parseBase} from '$lib/common/transform/parse-or-throw'

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
 * Save document base to OPFS
 * @returns void
 */
export async function saveBase(
	base: FrontmatterBase,
): Promise<FrontmatterBase> {
	try {
		const data = parseBase('Save Base', base)

		const directoryHandle = await getBaseHandle({create: true})
		await saveEntry(directoryHandle, {name: 'base'}, data)

		return data
	} catch (error) {
		console.log(error)

		throw new Error('Error saving document base', {cause: error})
	}
}
