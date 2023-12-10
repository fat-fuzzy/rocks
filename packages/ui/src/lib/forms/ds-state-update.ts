import type {Settings} from '$types'
import constants from '$types/constants'

const {DEFAULT_DS_STATE, TRANSITION_REVEAL} = constants

export class DsStateUpdate {
	state: {
		revealNav: Settings
		revealHeaderNav: Settings
		revealHeaderSettings: Settings
	}
	/**
	 * Initialize default State object or from the user's cookie values, if any
	 */
	constructor(
		settings: {
			revealNav: Settings
			revealHeaderNav: Settings
			revealHeaderSettings: Settings
		} | null = null,
	) {
		if (settings) {
			this.state = settings
		} else {
			this.state = DEFAULT_DS_STATE
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	enter(data: FormData) {
		if (data.has('button-RevealNav')) {
			return this.revealNav(data)
		}
		if (data.has('button-Header-nav-reveal')) {
			return this.revealHeaderNav(data)
		}
		if (data.has('button-Header-menu-settings')) {
			return this.revealHeaderSettings(data)
		}
	}

	/**
	 * Update State based on inputs
	 */
	revealNav(data: FormData) {
		const updated = data.get('button-RevealNav')?.toString()
		if (updated) {
			this.state.revealNav.reveal = TRANSITION_REVEAL[this.state.revealNav.reveal]
			return true
		}
		return false
	}

	/**
	 * Update State based on inputs
	 */
	revealHeaderNav(data: FormData) {
		const updated = data.get('button-Header-nav-reveal')?.toString()
		if (updated) {
			this.state.revealHeaderNav.reveal = TRANSITION_REVEAL[this.state.revealHeaderNav.reveal]
			return true
		}
		return false
	}

	/**
	 * Update State based on inputs
	 */
	revealHeaderSettings(data: FormData) {
		const updated = data.get('button-Header-menu-settings')?.toString()
		if (updated) {
			this.state.revealHeaderSettings.reveal =
				TRANSITION_REVEAL[this.state.revealHeaderSettings.reveal]
			return true
		}
		return false
	}

	/**
	 * Serialize State so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.state)
	}
}
