import {writable} from 'svelte/store'
import {DEFAULT_STYLES} from '$lib/api/styles/styles-api'

// Initial values
export const categoryStore = writable('app')

// Selected styles
export const currentStyles = writable(DEFAULT_STYLES)
