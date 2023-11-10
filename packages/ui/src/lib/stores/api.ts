import {writable} from 'svelte/store'
import {DEFAULT_STYLES} from '$lib/api/styles/styles-api'

// Initial values
export const theme = writable(0)

// Selected styles
export const currentStyles = writable(DEFAULT_STYLES)
