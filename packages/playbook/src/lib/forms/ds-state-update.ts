import ui from '@fat-fuzzy/ui'
import type {Settings} from '$types'
import type {Cookies} from '@sveltejs/kit'

const {DEFAULT_REVEAL_STATE} = ui.constants

export type UiActionGetInput = {
	cookies: Cookies
	key: string
	defaultAction?: unknown
}

export type UiActionSetInput = {
	data: FormData
	block: string
	value?: unknown
	options: {
		state?: unknown
		domain?: string
	} // TODO: improve options (use schema ?)
}

export type UiActionSetOutput = {
	success: boolean
	key?: string
	type?: string
	state?: unknown
	message?: string
}

export type DsState = {
	Reveal: Settings
	RevealMenu: Settings
	RevealNav: Settings
	HeaderRevealNav: Settings
	HeaderRevealContext: Settings
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
		HeaderRevealContext,
	}: DsState) {
		this.state = {
			Reveal: Reveal ?? DEFAULT_REVEAL_STATE,
			RevealMenu: RevealMenu ?? DEFAULT_REVEAL_STATE,
			RevealNav: RevealNav ?? DEFAULT_REVEAL_STATE,
			HeaderRevealNav: HeaderRevealNav ?? DEFAULT_REVEAL_STATE,
			HeaderRevealContext: HeaderRevealContext ?? DEFAULT_REVEAL_STATE,
		}
	}

	/**
	 * Update State based on inputs
	 */
	enter(data: FormData) {
		let success = false
		if (data.has('button-reveal-Reveal')) {
			success = this.toggleReveal(data)
		}
		if (data.has('button-reveal-RevealMenu')) {
			success = this.toggleMenuReveal(data)
		}
		if (data.has('button-reveal-RevealNav')) {
			success = this.toggleNavReveal(data)
		}
		if (data.has('button-reveal-Header-nav')) {
			success = this.toggleSidebarReveal(data)
		}
		if (data.has('button-reveal-Header-settings')) {
			success = this.toggleAppContextReveal(data)
		}
		return {
			success,
			message: success ? '' : 'Failed to update UI', // TODO: improve / manage error message with intl package,
		}
	}

	handleToggleUiReveal({data, block}): boolean {
		const currentState = this.state[block as keyof DsState]

		const reveal = new UiReveal(block, currentState)
		const newState = reveal.reveal(data)
		if (!newState.success) {
			return false
		}
		this.state[block as keyof DsState] = newState.state ?? currentState

		return true
	}

	toggleReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			block: 'Reveal',
		})
	}

	toggleMenuReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			block: 'RevealMenu',
		})
	}

	toggleNavReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			block: 'RevealNav',
		})
	}

	toggleSidebarReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			block: 'Header-nav-reveal',
		})
	}

	toggleAppContextReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			block: 'Header-appContext-reveal',
		})
	}

	togglePageContextReveal(data: FormData) {
		return this.handleToggleUiReveal({
			data,
			block: 'pageContext-reveal',
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
