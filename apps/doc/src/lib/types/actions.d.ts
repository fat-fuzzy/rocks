import type {RequestEvent} from '@sveltejs/kit'

export type UiActionGetInput = {
	cookies: Cookies
	key: string
	defaultAction?: any
}

export type UiActionSetInput = {
	event: RequestEvent
	element?: string
	value?: any
	options: {
		state?: any
		domain?: string
	} // TODO: improve options (use schema ?)
}

export type UiActionSetOutput = void | {
	success: boolean
	key: string
	state: any
}
