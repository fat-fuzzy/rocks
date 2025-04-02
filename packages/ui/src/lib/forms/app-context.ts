import type {ViewingPreferences} from '$types'
import constants from '$lib/types/constants.js'

const {DEFAULT_PREFERENCES, TRANSITION_BRIGHTNESS, TRANSITION_CONTRAST} =
	constants

class AppContext {
	app: ViewingPreferences
	/**
	 * Initialize default Settings object or from the user's cookie values, if any
	 */
	constructor(settings: ViewingPreferences | null = null) {
		if (settings) {
			this.app = settings
		} else {
			this.app = DEFAULT_PREFERENCES
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	update(data: FormData) {
		try {
			let updated = data.get('brightness')?.toString()
			if (updated) {
				this.app.brightness = TRANSITION_BRIGHTNESS[updated]
			}
			updated = data.get('contrast')?.toString()
			if (updated) {
				this.app.contrast = TRANSITION_CONTRAST[updated]
			}
			return true
		} catch (e) {
			return false
		}
	}

	/**
	 * Serialize Settings so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.app)
	}
}

export default AppContext
