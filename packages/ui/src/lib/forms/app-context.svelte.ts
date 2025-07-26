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
		if (!this.state.consent) {
			this.state.consent = {
				functional: true,
				legitimateInterest: true,
			}
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	update(data: FormData) {
		let updated = false
		if (data.has('brightness')) {
			let brightness = String(data.get('brightness'))
			// This sets the inital brightness value and enables the sync of JS toggles
			if (!this.state.brightness || this.state.brightness !== brightness) {
				this.state.brightness = brightness
			} else {
				// This enables the sync of no-JS toggles
				// TODO: Fix nojs init
				this.state.brightness = TRANSITION_BRIGHTNESS[String(brightness)]
			}
			updated = true
		}
		if (data.has('contrast')) {
			let contrast = String(data.get('contrast'))
			// This sets the inital contrast value and enables the sync of JS toggles
			if (!this.state.contrast || this.state.contrast !== contrast) {
				this.state.contrast = contrast
			} else {
				// This enables the sync of no-JS toggles
				// TODO: Fix nojs init
				this.state.contrast = TRANSITION_CONTRAST[String(contrast)]
			}
			updated = true
		}

		if (data.has('consent-submit') || data.has('consent-reset')) {
			if (data.has('legitimateInterest')) {
				let legitimateInterest = data.get('legitimateInterest')
				this.state.consent.legitimateInterest =
					legitimateInterest?.toString() === 'on'
			} else {
				this.state.consent.legitimateInterest = true
			}
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
