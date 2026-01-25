import type {UiSettings, ViewingPreferences} from '$types'
import constants from '$lib/types/constants.js'

const {DEFAULT_PREFERENCES, TRANSITION_BRIGHTNESS, TRANSITION_CONTRAST} =
	constants

class AppContext {
	state: ViewingPreferences = DEFAULT_PREFERENCES
	/**
	 * Initialize default Settings object or from the user's cookie values, if any
	 */
	constructor(preferences: ViewingPreferences | null = null) {
		if (preferences && preferences.brightness) {
			this.state = preferences
		}

		if (!this.state.consent.functional) {
			this.state.consent.functional = true
		}

		if (!this.state.consent.legitimateInterest) {
			this.state.consent.legitimateInterest = true
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	update(data: FormData) {
		let updated = false

		if (data.has('brightness')) {
			const brightness = String(data.get('brightness'))
			// This sets the inital brightness value and enables the sync of JS toggles
			if (!this.state.brightness || this.state.brightness !== brightness) {
				this.state.brightness = brightness as UiSettings
			} else {
				// This enables the sync of no-JS toggles
				// TODO: Fix nojs init
				this.state.brightness = TRANSITION_BRIGHTNESS[
					String(brightness)
				] as UiSettings
			}
			updated = true
		}

		if (data.has('contrast')) {
			const contrast = String(data.get('contrast'))
			// This sets the initial contrast value and enables the sync of JS toggles
			if (!this.state.contrast || this.state.contrast !== contrast) {
				this.state.contrast = contrast as UiSettings
			} else {
				// This enables the sync of no-JS toggles
				// TODO: Fix nojs init
				this.state.contrast = TRANSITION_CONTRAST[
					String(contrast)
				] as UiSettings
			}
			updated = true
		}

		if (data.has('consent-submit')) {
			const legitimateInterest = data.get('legitimateInterest')
			this.state.consent.legitimateInterest =
				legitimateInterest?.toString() === 'on'
			updated = true
		}

		return {
			success: updated,
			state: this.toString(),
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
