const DismissEvent = Object.freeze({
	__proto__: null,
	click: 'click',
	outside: 'outside',
	navigate: 'navigate',
})

const ButtonEvent = Object.freeze({
	__proto__: null,
	expand: 'expand',
	collapse: 'collapse',
	toggle: 'toggle',
	switch: 'switch',
	click: 'click',
	outside: 'outside',
})

const MoveEvent = Object.freeze({
	__proto__: null,
	dragstart: 'dragstart',
	drag: 'drag',
	dragend: 'dragend',
	movestart: 'movestart',
	move: 'move',
	moveend: 'moveend',
})

const UiTouchEvent = Object.freeze({
	__proto__: null,
	move: 'touchmove',
	cancel: 'touchend',
	end: 'touchend',
})

const UiMouseEvent = Object.freeze({
	__proto__: null,
	hover: 'hover',
	move: 'mousemove',
	cancel: 'mouseup dragstart',
	end: 'mouseup',
})

const UiEffect = Object.freeze({
	__proto__: null,
	none: 'none',
	copy: 'copy',
	link: 'link',
	move: 'move',
})

const UiMoveParams = Object.freeze({
	__proto__: null,
	viewport: 'viewport', // [x, y]
	start: 'start', // [x, y]
	dist: 'dist', // [x, y]
	delta: 'delta', // [x, y]
	velocity: 'velocity', // [x, y]
})

const InputType = Object.freeze({
	__proto__: null,
	text: 'text',
	number: 'number',
	range: 'range',
	radio: 'radio',
	checkbox: 'checkbox',
	file: 'file',
	email: 'email',
	submit: 'submit',
	password: 'password',
})

const AriaLiveEnum = Object.freeze({
	__proto__: null,
	polite: 'polite',
	off: 'off',
	assertive: 'assertive',
})

const AriaInvoke = Object.freeze({
	__proto__: null,
	manual: 'manual',
	auto: 'auto',
})

const Preferences = Object.freeze({
	__proto__: null,
	brightness: 'brightness',
	contrast: 'contrast',
	locale: 'locale',
	consent: 'consent',
})

const UiSettings = Object.freeze({
	__proto__: null,
	day: 'day',
	night: 'night',
	blend: 'blend',
	contrast: 'contrast',
})

const state_props = {
	DismissEvent,
	ButtonEvent,
	MoveEvent,
	UiTouchEvent,
	UiMouseEvent,
	UiEffect,
	UiMoveParams,
	InputType,
	AriaLiveEnum,
	AriaInvoke,
	Preferences,
	UiSettings,
}

export default state_props
