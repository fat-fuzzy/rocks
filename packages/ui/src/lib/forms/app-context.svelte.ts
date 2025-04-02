import type {ViewingPreferences} from '$types'
import constants from '$lib/types/constants.js'

const {
	DEFAULT_PREFERENCES,
	DEFAULT_REVEAL_STATE,
	TRANSITION_BRIGHTNESS,
	TRANSITION_CONTRAST,
} = constants

class AppContext {
	app: ViewingPreferences = $state({
		...DEFAULT_PREFERENCES,
		...DEFAULT_REVEAL_STATE,
	})
	/**
	 * Initialize default Settings object or from the user's cookie values, if any
	 */
	constructor(preferences: ViewingPreferences | null = null) {
		if (preferences) {
			this.app = {...this.app, ...preferences}
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	update(data: FormData) {
		let updated
		if (data.has('brightness')) {
			updated = data.get('brightness')
		}
		if (updated && typeof updated === 'string') {
			/**
			 * This makes it work without javascript:
			 * The button value changes with JS but not without
			 */
			if (updated === this.app.brightness) {
				updated = TRANSITION_BRIGHTNESS[updated]
			}
			this.app.brightness = updated
		}
		if (data.has('contrast')) {
			updated = data.get('contrast')
		}
		if (updated && typeof updated === 'string') {
			/**
			 * This makes it work without javascript:
			 * The button value changes with JS but not without
			 */
			if (updated === this.app.contrast) {
				updated = TRANSITION_CONTRAST[updated]
			}
			this.app.contrast = updated
		}
		if (!updated) {
			return {
				success: false,
			}
		}
		return {
			success: true,
			state: this.app,
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
