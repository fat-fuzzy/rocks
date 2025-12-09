export type DismissEvent = 'click' | 'outside' | 'navigate'

export type UiState =
	| 'active'
	| 'inactive'
	| 'expanded'
	| 'collapsed'
	| 'hovering'
	| 'dropped'
	| 'over'

export type ButtonEvent =
	| 'expand'
	| 'collapse'
	| 'toggle'
	| 'switch'
	| 'click'
	| 'outside'

export type AriaInvoke = 'manual' | 'auto'

export type Preferences = 'brightness' | 'contrast' | 'locale' | 'consent'

export type UiSettings = 'day' | 'night' | 'blend' | 'contrast'
