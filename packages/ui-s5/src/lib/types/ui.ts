export type UiDimensions = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

enum ButtonType {
	expand = 'expand',
	switch = 'switch',
	toggle = 'toggle',
}

enum ButtonStates {
	active = 'active',
	inactive = 'inactive',
}

enum ButtonEventType {
	EXPAND = 'EXPAND',
	TOGGLE = 'TOGGLE',
	SWITCH = 'SWITCH',
}

type ButtonEvent =
	| {[ButtonEventType.EXPAND]: {target: ButtonStates.active | ButtonStates.inactive}}
	| {[ButtonEventType.TOGGLE]: {target: ButtonStates.active | ButtonStates.inactive}}
	| {[ButtonEventType.SWITCH]: {target: ButtonStates.active | ButtonStates.inactive}}

type StateSwitch = {
	[ButtonStates.inactive]: {
		on: ButtonEvent
	}
	[ButtonStates.active]: {
		on: ButtonEvent
	}
}
