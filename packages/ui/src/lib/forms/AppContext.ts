import type {PrivacyPreferences} from '$types'
import constants from '$lib/types/constants.js'

const {DEFAULT_COOKIES_PREFERENCES} = constants

class AppContext {
	state: PrivacyPreferences = DEFAULT_COOKIES_PREFERENCES
	/**
	 * Initialize default Settings object or from the user's cookie values, if any
	 */
	constructor(preferences: PrivacyPreferences | null = null) {
		if (preferences) {
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
