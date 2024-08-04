import type {Settings} from '$types'
import constants from '$lib/types/constants.js'

const {DEFAULT_REVEAL_STATE, TRANSITION_REVEAL} = constants

export class UiReveal {
	nav: Settings

	/**
	 * Initialize default nav object or from the user's cookie values, if any
	 */
	constructor(nav: Settings | null = null) {
		if (nav) {
			this.nav = nav
		} else {
			this.nav = DEFAULT_REVEAL_STATE
		}
	}

	/**
	 * Update nav based on inputs
	 */
	reveal(data: FormData) {
		let updated
		if (data.has('reveal')) {
			updated = data.get('reveal')?.toString()
		}
		if (data.has('reveal-tokens')) {
			updated = data.get('reveal-tokens')?.toString()
		}
		if (data.has('reveal-blocks')) {
			updated = data.get('reveal-blocks')?.toString()
		}
		if (data.has('reveal-layouts')) {
			updated = data.get('reveal-layouts')?.toString()
		}
		if (data.has('reveal-recipes')) {
			updated = data.get('reveal-recipes')?.toString()
		}
		if (data.has('reveal-usage')) {
			updated = data.get('reveal-usage')?.toString()
		}
		if (data.has('reveal-decisions')) {
			updated = data.get('reveal-decisions')?.toString()
		}
		if (updated) {
			this.nav.reveal = TRANSITION_REVEAL[this.nav.reveal]
			return true
		}
		return false
	}

	/**
	 * Serialize nav so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.nav)
	}
}
