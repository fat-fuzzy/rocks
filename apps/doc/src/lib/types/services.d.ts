export type UiStateGetInput = {
	cookies: Cookies
	key: string
}

export type UiStateSetInput = {
	cookies: Cookies
	key: string
	value?: any
	options: {path: string; host?: string} // TODO: improve options (use schema ?)
}
