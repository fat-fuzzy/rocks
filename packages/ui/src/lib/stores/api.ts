import {readable, writable, derived} from 'svelte/store'
import {API_OPTIONS, DEFAULT_OPTIONS} from '../api/options'

// Initial values

export const categoryStore = writable('app')

// API Form options
// TODO: figure out how I can deduct props from Svelte component

export const optionsApp = readable(API_OPTIONS['app'])
export const optionsShared = readable(API_OPTIONS['shared'])
export const optionsCategory = derived(categoryStore, ($category) => API_OPTIONS[$category])
export const optionsStore = derived(categoryStore, () => ({
	...optionsCategory,
	...optionsShared,
	...optionsApp,
}))

// Default values
// TODO: figure out how I can deduct props from Svelte component

export const defaultApp = readable(DEFAULT_OPTIONS['app'])
export const defaultShared = readable(DEFAULT_OPTIONS['shared'])
export const defaultCategory = derived(categoryStore, ($category) => DEFAULT_OPTIONS[$category])
export const defaultStore = derived(categoryStore, () => ({
	...defaultCategory,
	...defaultShared,
	...defaultApp,
}))

// Selected values
// TODO: figure out how I can deduct props from Svelte component

export const selectedApp = writable(DEFAULT_OPTIONS['app'])
export const selectedShared = writable(DEFAULT_OPTIONS['shared'])
export const selectedStore = writable({
	...defaultCategory,
	...selectedShared,
	...selectedApp,
})
