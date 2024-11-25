import type {UiRevealState} from '$types'
import constants from '$lib/types/constants.js'

const {DEFAULT_REVEAL_STATE, TRANSITION_REVEAL} = constants

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
	 * Update nav based on inputs
	 * TODO: make configurable from consumer
	 */
	reveal(data: FormData) {
		console.log('handleUiToggleReveal data', data)
		let updated

		if (data.has('state')) {
			updated = data.get('state')?.toString()
		}
		if (data.has('reveal')) {
			updated = data.get('reveal')?.toString()
		}
		if (data.has('reveal-tokens')) {
			updated = data.get('reveal-tokens')?.toString()
		}
		if (data.has('reveal-auto')) {
			updated = data.get('reveal-auto')?.toString()
		}
		if (data.has('reveal-settings')) {
			updated = data.get('reveal-settings')?.toString()
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
		if (data.has('reveal-learning')) {
			updated = data.get('reveal-learning')?.toString()
		}
		if (data.has('reveal-projects')) {
			updated = data.get('reveal-projects')?.toString()
		}
		if (updated) {
			this.state.reveal = TRANSITION_REVEAL[this.state.reveal]
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
