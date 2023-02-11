import {readable, writable, derived} from 'svelte/store'
import {API_OPTIONS, DEFAULT_OPTIONS} from '../api/ui-options'

// Initial values

export const categoryStore = writable('app')

// API Form options
// TODO: figure out how I can deduct props from Svelte component

export const optionsApp = readable(API_OPTIONS['app'])
export const optionsShared = readable(API_OPTIONS['shared'])
export const optionsCategory = derived(categoryStore, ($category) => API_OPTIONS[$category])
export const defaultOptionsStore = derived(categoryStore, () => ({
	...optionsCategory,
	...optionsShared,
	...optionsApp,
}))
// API Form options for current category
// TODO: figure out how I can deduct props from Svelte component

// export const categoryOptionsApp = writable(API_OPTIONS['app'])
// export const categoryOptionsShared = writable(API_OPTIONS['shared'])
// export const optionsStore = writable({
// 	...optionsCategory,
// 	...categoryOptionsShared,
// 	...categoryOptionsApp,
// })

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
