import {browser} from '$app/environment'
import WorkerBridge from '$lib/workers/worker-bridge'
import StorageWorker from '$lib/workers/storage.worker?worker'

let bridge: WorkerBridge | undefined

export function initBridge() {
	if (!browser) {
		throw new Error('Bridge can only be initialized in the browser')
	}
	if (!bridge) {
		bridge = new WorkerBridge(new StorageWorker())
	}

	return bridge
}

export function getBridge() {
	if (!bridge) {
		throw new Error('Bridge not initialized — call initBridge() first')
	}

	return bridge
}

export function destroyBridge() {
	bridge?.destroy?.()
	bridge = undefined
}
