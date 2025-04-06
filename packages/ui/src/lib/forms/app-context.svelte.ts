import type {ViewingPreferences} from '$types'
import constants from '$lib/types/constants.js'

const {DEFAULT_PREFERENCES, TRANSITION_BRIGHTNESS, TRANSITION_CONTRAST} =
	constants

class AppContext {
	state: ViewingPreferences = $state(DEFAULT_PREFERENCES)
	/**
	 * Initialize default Settings object or from the user's cookie values, if any
	 */
	constructor(preferences: ViewingPreferences | null = null) {
		if (preferences) {
			this.state = preferences
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	update(data: FormData) {
		let updated = false
		if (data.has('brightness')) {
			let brightness = data.get('brightness')
			this.state.brightness = TRANSITION_BRIGHTNESS[String(brightness)]
			updated = true
		}
		if (data.has('contrast')) {
			let contrast = data.get('contrast')
			this.state.contrast = TRANSITION_CONTRAST[String(contrast)]
			updated = true
		}
		if (updated) {
			return {
				success: true,
				state: this.toString(),
			}
		}

		return {
			success: false,
		}
	}

	/**
	 * Serialize Settings so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.state)
	}
}

export default AppContext
