import type {Settings} from '$types'
import constants from '$types/constants'

const {DEFAULT_DS_STATE} = constants

export class DsStateUpdate {
	api: Settings
	/**
	 * Initialize default State object or from the user's cookie values, if any
	 */
	constructor(settings: Settings | null = null) {
		if (settings) {
			this.api = settings
		} else {
			this.api = DEFAULT_DS_STATE
		}
	}

	/**
	 * Update State based on inputs
	 */
	update(data: FormData) {
		for (const [key, value] of data) {
			// TODO
		}
	}

	/**
	 * Serialize State so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify({brightness: this.api.brightness, contrast: this.api.contrast})
	}
}
