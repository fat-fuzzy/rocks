import {writable} from 'svelte/store'

import constants from '$lib/types/constants.js'

const {
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_STYLES,
	DEFAULT_TABS,
} = constants

export const styles = writable(DEFAULT_STYLES)

export const reveal = writable(DEFAULT_REVEAL_STATE)

export const app = writable(DEFAULT_APP_SETTINGS)

export const menuReveal = writable(DEFAULT_REVEAL_STATE)

export const navReveal = writable(DEFAULT_REVEAL_STATE)

export const sidebarReveal = writable(DEFAULT_NAV_REVEAL_STATE)

export const settingsReveal = writable(DEFAULT_REVEAL_STATE)

export const currentTabs = writable({ui: DEFAULT_TABS[0]})
