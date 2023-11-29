import {writable} from 'svelte/store'

import constants from '$lib/types/constants'

const {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} = constants

export const app = writable(DEFAULT_APP_SETTINGS)

export const navReveal = writable(DEFAULT_REVEAL_STATE)

export const sidebarReveal = writable(DEFAULT_REVEAL_STATE)

export const settingsReveal = writable(DEFAULT_REVEAL_STATE)
