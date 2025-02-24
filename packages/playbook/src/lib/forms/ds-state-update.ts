import ui from '@fat-fuzzy/ui'
import type {Settings} from '$types'
import type {Cookies} from '@sveltejs/kit'

export type UiActionGetInput = {
	cookies: Cookies
	key: string
	defaultAction?: any
}

export type UiActionSetInput = {
	data: FormData
	element: string
	value?: any
	options: {
		state?: any
		domain?: string
	} // TODO: improve options (use schema ?)
}

export type UiActionSetOutput = {
	success: boolean
	key?: string
	type?: string
	state?: any
	message?: string
}

export type DsState = {
	[key: string]: Settings
}

const {DEFAULT_DS_STATE, APP_PREFIX} = ui.constants
const {UiReveal} = ui.forms

class DsStateUpdate {
	state: DsState
	/**
	 * Initialize default State object or from the user's cookie values, if any
	 */
	constructor(
		state: {
			reveal: Settings
			menuReveal: Settings
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
	 * Update State based on inputs
	 */
	enter(data: FormData) {
		if (data.has('button-reveal-Reveal')) {
			return this.toggleReveal(data)
		}
		if (data.has('button-reveal-RevealMenu')) {
			return this.toggleMenuReveal(data)
		}
		if (data.has('button-reveal-RevealNav')) {
			return this.toggleNavReveal(data)
		}
		if (data.has('button-reveal-Header-nav-reveal')) {
			return this.toggleSidebarReveal(data)
		}
		if (data.has('button-reveal-Header-settings-reveal')) {
			return this.toggleSettingsReveal(data)
		}
		return {
			success: false,
			message: 'Failed to update UI', // TODO: improve / manage error message with intl package,
		}
	}

	handleToggleUiReveal({data, element}): boolean {
		const currentState = this.state[element]

		const reveal = new UiReveal(currentState, element)
		const newState = reveal.reveal(data)
		if (!newState.success) {
			return false
		}
		this.state[element] = newState.state ?? currentState

		console.log(`Updated ${element} state`, this.state[element])
		console.log(`this.state`, this.state)

		return true
	}

	toggleReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			element: 'Reveal',
		})
	}

	toggleMenuReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			element: 'RevealMenu',
		})
	}

	toggleNavReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			element: 'RevealNav',
		})
	}

	toggleSidebarReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			element: 'Header-nav-reveal',
		})
	}

	toggleSettingsReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			element: 'Header-settings-reveal',
		})
	}

	/**
	 * Serialize State so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.state)
	}
}

export default DsStateUpdate
