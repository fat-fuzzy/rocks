import ui from '@fat-fuzzy/ui'
import type {Settings} from '$types'
import type {Cookies} from '@sveltejs/kit'
import constants from '$lib/types/constants'

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
	Reveal: Settings
	RevealMenu: Settings
	RevealNav: Settings
	HeaderRevealNav: Settings
	HeaderRevealSettings: Settings
}

const {UiReveal} = ui.forms

class DsStateUpdate {
	state: DsState
	/**
	 * Initialize default State object or from the user's cookie values, if any
	 */
	constructor({
		Reveal,
		RevealMenu,
		RevealNav,
		HeaderRevealNav,
		HeaderRevealSettings,
	}: DsState) {
		this.state = {
			Reveal,
			RevealMenu,
			RevealNav,
			HeaderRevealNav,
			HeaderRevealSettings,
		}
	}

	/**
	 * Update State based on inputs
	 */
	enter(data: FormData) {
		let success = false
		if (data.has('button-reveal-Reveal')) {
			success = this.toggleReveal(data)

			success = this.toggleReveal(data)
		}
		if (data.has('button-reveal-RevealMenu')) {
			success = this.toggleMenuReveal(data)
		}
		if (data.has('button-reveal-RevealNav')) {
			success = this.toggleNavReveal(data)
		}
		if (data.has('button-reveal-Header-nav-reveal')) {
			success = this.toggleSidebarReveal(data)
		}
		if (data.has('button-reveal-Header-settings-reveal')) {
			success = this.toggleSettingsReveal(data)
		}
		if (success) {
			this.state = this.state
		}
		return {
			success,
			message: success ? '' : 'Failed to update UI', // TODO: improve / manage error message with intl package,
		}
	}

	handleToggleUiReveal({data, element}): boolean {
		const currentState = this.state[element as keyof DsState]

		const reveal = new UiReveal(currentState, element)
		const newState = reveal.reveal(data)
		if (!newState.success) {
			return false
		}
		this.state[element as keyof DsState] = newState.state ?? currentState

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
