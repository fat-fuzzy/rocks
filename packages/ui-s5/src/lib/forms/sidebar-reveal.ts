import type {Settings} from '$types'
import constants from '$lib/types/constants'

const {DEFAULT_REVEAL_STATE, TRANSITION_REVEAL} = constants

export class SidebarReveal {
	sidebar: Settings

	/**
	 * Initialize default sidebar object or from the user's cookie values, if any
	 */
	constructor(sidebar: Settings | null = null) {
		if (sidebar) {
			this.sidebar = sidebar
		} else {
			this.sidebar = DEFAULT_REVEAL_STATE
		}
	}

	/**
	 * Update sidebar based on inputs
	 */
	reveal(data: FormData) {
		if (data.has('button-reveal')) {
			const updated = data.get('button-reveal')?.toString()
			if (updated) {
				this.sidebar.reveal = TRANSITION_REVEAL[this.sidebar.reveal]
				return true
			}
		}
		return false
	}

	/**
	 * Serialize sidebar so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.sidebar)
	}
}
