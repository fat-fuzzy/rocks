import {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS} from '$types/constants'
import {writable} from 'svelte/store'

export const reveal = writable(DEFAULT_REVEAL_STATE)

export const app = writable(DEFAULT_APP_SETTINGS)
