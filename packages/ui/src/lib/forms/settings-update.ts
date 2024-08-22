import type {Settings} from '$types'
import constants from '$lib/types/constants.js'

const {DEFAULT_APP_SETTINGS, TRANSITION_BRIGHTNESS, TRANSITION_CONTRAST} =
	constants

class SettingsUpdate {
	app: Settings
	/**
	 * Initialize default Settings object or from the user's cookie values, if any
	 */
	constructor(settings: Settings | null = null) {
		if (settings) {
			this.app = {settings: settings.settings}
		} else {
			this.app = DEFAULT_APP_SETTINGS
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	update(data: FormData) {
		try {
			let updated = data.get('brightness')?.toString()
			if (updated) {
				this.app.brightness = TRANSITION_BRIGHTNESS[this.app.brightness]
			}
			updated = data.get('contrast')?.toString()
			if (updated) {
				this.app.contrast = TRANSITION_CONTRAST[this.app.contrast]
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

export default SettingsUpdate
