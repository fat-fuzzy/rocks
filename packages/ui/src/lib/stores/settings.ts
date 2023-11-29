import {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} from '$types/constants'
import {writable} from 'svelte/store'

export const app = writable(DEFAULT_APP_SETTINGS)

export const navReveal = writable(DEFAULT_REVEAL_STATE)

export const sidebarReveal = writable(DEFAULT_REVEAL_STATE)

export const settingsReveal = writable(DEFAULT_REVEAL_STATE)
