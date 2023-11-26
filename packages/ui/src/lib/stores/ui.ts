import {writable} from 'svelte/store'
import {DEFAULT_STYLES} from '$lib/api/styles/styles-api'

// Selected styles
export const currentStyles = writable(DEFAULT_STYLES)
