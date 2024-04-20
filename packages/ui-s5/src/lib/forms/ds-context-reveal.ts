import type {Settings} from '$types'
import constants from '$lib/types/constants'

const {DEFAULT_REVEAL_STATE, TRANSITION_REVEAL} = constants

export class DsContextReveal {
	settings: Settings

	/**
	 * Initialize default Settings object or from the user's cookie values, if any
	 */
	constructor(settings: Settings | null = null) {
		if (settings) {
			this.settings = settings
		} else {
			this.settings = DEFAULT_REVEAL_STATE
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	reveal(data: FormData) {
		if (data.has('reveal')) {
			const updated = data.get('reveal')?.toString()
			if (updated) {
				this.settings.reveal = TRANSITION_REVEAL[updated]
				return true
			}
		}
		return false
	}

	/**
	 * Serialize Settings so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.settings)
	}
}
