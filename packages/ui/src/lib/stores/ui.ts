import {writable} from 'svelte/store'

import constants from '$lib/types/constants'

const {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS, DEFAULT_STYLES} = constants

export const styles = writable(DEFAULT_STYLES)

export const reveal = writable(DEFAULT_REVEAL_STATE)

export const app = writable(DEFAULT_APP_SETTINGS)
