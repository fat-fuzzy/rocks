import type {WorkerMessage, WorkerResponse} from '$types'

import {
	isSeedComplete,
	seedBase,
	seedStructure,
	seedRoot,
	restoreFromBackup,
	loadFile,
	saveBlock,
	createSection,
	saveSection,
	deleteContentFile,
	savePreset,
	deletePreset,
	loadPreset,
	getPresetsData,
	getContentData,
	getStructureData,
	getBaseData,
	saveBase,
} from '$lib/workers/storage/opfs'

import {deleteAllContent} from '$lib/workers/storage/opfs-tools'

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
	const msg = event.data

	try {
		const body = await dispatch(msg)
		const response: WorkerResponse = {
			requestId: msg.requestId,
			ok: true,
			body,
			timestamp: Date.now(),
		}

		self.postMessage(response)
	} catch (err) {
		const response: WorkerResponse = {
			requestId: msg.requestId,
			ok: false,
			error: err instanceof Error ? err.message : String(err),
			timestamp: Date.now(),
		}
		self.postMessage(response)
	}
}

async function dispatch(msg: WorkerMessage) {
	switch (msg.type) {
		case 'CHECK_SEED': {
			try {
				const seeded = await isSeedComplete(msg.payload.type)

				return {seeded}
			} catch (err) {
				if ((err as Error).message.startsWith('NotFoundError:')) {
					return {seeded: false}
				} else throw err
			}
		}

		case 'SEED_BASE': {
			await seedBase(msg.payload.base)

			return {seeded: Date.now()}
		}

		case 'SEED_STRUCTURE': {
			await seedStructure(msg.payload)

			return {seeded: Date.now()}
		}

		case 'GET_DOCUMENT_BASE': {
			const result = await getBaseData()

			if (result) {
				return result
			} else {
				throw new Error('No data found for base')
			}
		}

		case 'GET_DOCUMENT_STRUCTURE': {
			const result = await getStructureData()

			if (result) {
				return result
			} else {
				throw new Error('No data found for structure')
			}
		}

		case 'SEED_ROOT': {
			await seedRoot(msg.payload.seed)

			return {seeded: Date.now()}
		}

		case 'SAVE_BASE': {
			await saveBase(msg.payload.base)

			return {seeded: Date.now()}
		}

		case 'RESTORE_FROM_BACKUP': {
			await restoreFromBackup(msg.payload)

			return {seeded: Date.now()}
		}

		case 'GET_DOCUMENT_CONTENT': {
			const result = await loadFile(msg.payload)

			if (result?.data) {
				return result.data
			} else {
				throw new Error('No content found')
			}
		}

		case 'GET_ALL_DOCUMENTS': {
			const result = await getContentData()

			if (result?.data) {
				return result.data
			} else {
				throw new Error('No docs found')
			}
		}

		case 'GET_PRESET': {
			const result = await loadPreset(msg.payload)
			let data

			if (result) {
				data = result.data
			}

			if (data) {
				return data
			} else {
				throw new Error('No preset found')
			}
		}

		case 'GET_ALL_PRESETS': {
			const result = await getPresetsData()
			let data

			if (result) {
				data = result.data
			}

			if (data) {
				return data
			} else {
				throw new Error('No presets found')
			}
		}

		case 'SAVE_BLOCK': {
			const result = await saveBlock(msg.payload)

			if (result) {
				return result
			} else {
				throw new Error('Error saving block')
			}
		}

		case 'CREATE_SECTION': {
			const result = await createSection(msg.payload)

			if (result) {
				return result
			} else {
				throw new Error('Error creating section')
			}
		}

		case 'SAVE_SECTION': {
			const result = await saveSection(msg.payload)

			if (result) {
				return result
			} else {
				throw new Error('Error saving section')
			}
		}

		case 'DELETE_DOCUMENT': {
			const result = await deleteContentFile(msg.payload)

			if (result) {
				return result
			} else {
				throw new Error('Error deleting doc')
			}
		}

		case 'SAVE_PRESET': {
			const result = await savePreset(msg.payload)

			if (result) {
				return result
			} else {
				throw new Error('Error saving preset')
			}
		}

		case 'DELETE_PRESET': {
			const result = await deletePreset(msg.payload)

			if (result) {
				return result
			} else {
				throw new Error('Error deleting preset')
			}
		}

		case 'DELETE_ALL':
			await deleteAllContent()
			return

		// case 'EXPORT_ALL': {
		// 	const markdown = await opfs.buildMarkdown(
		// 		msg.payload.language,
		// 		msg.payload.format,
		// 	)
		// 	return {markdown}
		// }

		default:
			throw new Error(`Unknown message type`)
	}
}

// Needed to make TS happy with `self` typed as DedicatedWorkerGlobalScope
export {} // makes it a module
