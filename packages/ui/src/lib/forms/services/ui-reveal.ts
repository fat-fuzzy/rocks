import type {UiRevealState} from '$types'
import constants from '$lib/types/constants.js'

const {DEFAULT_REVEAL_STATE} = constants

class UiReveal {
	state: UiRevealState

	/**
	 * Initialize default state object or from the user's cookie values, if any
	 */
	constructor(state: UiRevealState | null = null) {
		if (state) {
			this.state = state
		} else {
			this.state = DEFAULT_REVEAL_STATE
		}
	}

	/**
	 * Update nav
	 */
	reveal(data: FormData) {
		let updated

		if (data.has('state')) {
			updated = data.get('state')?.toString()
		}
		if (updated) {
			this.state.reveal = updated
			return {
				success: true,
				state: this.state,
			}
		}
		return {
			success: false,
		}
	}

	/**
	 * Serialize state so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.state)
	}
}

export default UiReveal
