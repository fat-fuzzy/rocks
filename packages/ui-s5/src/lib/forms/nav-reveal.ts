import type {Settings} from '$types'
import constants from '$lib/types/constants'

const {DEFAULT_REVEAL_STATE, TRANSITION_REVEAL} = constants

export class NavReveal {
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
		if (data.has('reveal')) {
			const updated = data.get('reveal')?.toString()
			if (updated) {
				this.nav.reveal = TRANSITION_REVEAL[this.nav.reveal]
				return true
			}
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
