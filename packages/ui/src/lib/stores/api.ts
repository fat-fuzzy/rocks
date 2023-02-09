import {writable} from 'svelte/store'
import {DEFAULT_OPTIONS} from '../api/options'

// TODO: figure out how I can deduct props from Svelte component
export const selectedBlock = writable({
	...DEFAULT_OPTIONS['blocks'],
	...DEFAULT_OPTIONS['shared'],
	...DEFAULT_OPTIONS['app'],
})
// TODO: figure out how I can deduct props from Svelte component
export const selectedLayout = writable({
	...DEFAULT_OPTIONS['layouts'],
	...DEFAULT_OPTIONS['shared'],
	...DEFAULT_OPTIONS['app'],
})

export const selected = writable({
	...DEFAULT_OPTIONS['app'],
})
