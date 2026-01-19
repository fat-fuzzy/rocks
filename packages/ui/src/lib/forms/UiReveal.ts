import constants from '$lib/types/constants.js'

const {DEFAULT_REVEAL_STATE, TRANSITION_REVEAL} = constants

class UiReveal {
	state: {[key: string]: string}
	id: string

	/**
	 * Initialize default state object or from the user's cookie values, if any
	 */
	constructor(state: {[key: string]: string} | null = null, id: string) {
		this.id = id
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

		if (data.has(`button-reveal-${this.id}`)) {
			updated = data.get(`button-reveal-${this.id}`)
		}

		if (!updated) {
			return {
				success: false,
			}
		}

		/**
		 * This makes it work without javascript:
		 * The button value changes with JS but not without
		 */
		if (updated === this.state.reveal) {
			updated = TRANSITION_REVEAL[updated]
		}

		this.state.reveal = updated.toString()
		return {
			success: true,
			state: this.state,
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
