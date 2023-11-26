import {writable} from 'svelte/store'
import {DEFAULT_STYLES} from '$lib/api/styles/styles-api'
import {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} from '$types/constants'

// Selected styles
export const styles = writable(DEFAULT_STYLES)

export const reveal = writable(DEFAULT_REVEAL_STATE)

export const app = writable(DEFAULT_APP_SETTINGS)
