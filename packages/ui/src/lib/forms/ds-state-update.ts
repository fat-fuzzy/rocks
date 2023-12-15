import type {Settings} from '$types'
import constants from '$types/constants'

const {DEFAULT_DS_STATE, TRANSITION_REVEAL} = constants

export class DsStateUpdate {
	state: {
		navReveal: Settings
		sidebarReveal: Settings
		settingsReveal: Settings
	}
	/**
	 * Initialize default State object or from the user's cookie values, if any
	 */
	constructor(
		state: {
			navReveal: Settings
			sidebarReveal: Settings
			settingsReveal: Settings
		} | null = null,
	) {
		if (state) {
			this.state = state
		} else {
			this.state = DEFAULT_DS_STATE
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	enter(data: FormData) {
		if (data.has('button-ui-RevealNav')) {
			return this.toggleNavReveal(data)
		}
		if (data.has('button-ui-Header-nav-reveal')) {
			return this.toggleSidebarReveal(data)
		}
		if (data.has('button-ui-Header-menu-settings')) {
			return this.toggleSettingsReveal(data)
		}
	}

	/**
	 * Update State based on inputs
	 */
	toggleNavReveal(data: FormData) {
		const updated = data.get('button-ui-RevealNav')?.toString()
		if (updated) {
			this.state.navReveal.reveal = updated
			return true
		}
		return false
	}

	/**
	 * Update State based on inputs
	 */
	toggleSidebarReveal(data: FormData) {
		const updated = data.get('button-ui-Header-nav-reveal')?.toString()
		if (updated) {
			this.state.sidebarReveal.reveal = updated
			return true
		}
		return false
	}

	/**
	 * Update State based on inputs
	 */
	toggleSettingsReveal(data: FormData) {
		const updated = data.get('button-ui-Header-menu-settings')?.toString()
		if (updated) {
			this.state.settingsReveal.reveal = updated
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
