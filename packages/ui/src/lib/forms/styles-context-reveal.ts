import type {Settings} from '$types/constants'
import {DEFAULT_REVEAL_STATE, REVEAL_TRANSITION} from '$types/constants'

export class StylesContextReveal {
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
				this.settings.reveal = REVEAL_TRANSITION[this.settings.reveal]
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
