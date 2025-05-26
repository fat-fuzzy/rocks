export enum UiState {
	active = 'active',
	inactive = 'inactive',
	expanded = 'expanded',
	collapsed = 'collapsed',
	hovering = 'hovering',
	dropped = 'dropped',
	over = 'over',
}

export enum UiStatus {
	default = 'default',
	info = 'info',
	success = 'success',
	warning = 'warning',
	error = 'error',
}

export enum UiTextContext {
	form = 'form',
	prose = 'prose',
	code = 'code',
}

export enum UiSize {
	'2xs' = '2xs',
	xs = 'xs',
	sm = 'sm',
	md = 'md',
	lg = 'lg',
	xl = 'xl',
	'2xl' = '2xl',
}

export enum UiColor {
	primary = 'primary',
	accent = 'accent',
	highlight = 'highlight',
	neutral = 'neutral',
}

export enum UiAssetType {
	emoji = 'emoji',
	svg = 'svg',
	none = 'none',
}

export enum UiVariant {
	fill = 'fill',
	outline = 'outline',
	bare = 'bare',
}

export enum UiShape {
	round = 'round',
	square = 'square',
}

export enum UiDimensions {
	video = 'video',
	twin = 'twin',
	square = 'square',
}

export enum DismissEvent {
	click = 'click',
	outside = 'outside',
	navigate = 'navigate',
}

export enum ButtonEvent {
	expand = 'expand',
	collapse = 'collapse',
	toggle = 'toggle',
	switch = 'switch',
	click = 'click',
	outside = 'outside',
}

export enum MoveEvent {
	dragstart = 'dragstart',
	drag = 'drag',
	dragend = 'dragend',
	movestart = 'movestart',
	move = 'move',
	moveend = 'moveend',
}

export enum UiTouchEvent {
	move = 'touchmove',
	cancel = 'touchend',
	end = 'touchend',
}

export enum UiMouseEvent {
	hover = 'hover',
	move = 'mousemove',
	cancel = 'mouseup dragstart',
	end = 'mouseup',
}

export enum UiEffect {
	none = 'none',
	copy = 'copy',
	link = 'link',
	move = 'move',
}

export enum UiMoveParams {
	viewport = 'viewport', // [x, y]
	start = 'start', // [x, y]
	dist = 'dist', // [x, y]
	delta = 'delta', // [x, y]
	velocity = 'velocity', // [x, y]
}

export enum InputType {
	text = 'text',
	number = 'number',
	range = 'range',
	radio = 'radio',
	checkbox = 'checkbox',
	file = 'file',
	email = 'email',
	submit = 'submit',
	password = 'password',
}

export enum AriaLiveEnum {
	polite = 'polite',
	off = 'off',
	assertive = 'assertive',
}

export enum AriaInvoke {
	manual = 'manual',
	auto = 'auto',
}

export enum Preferences {
	brightness = 'brightness',
	contrast = 'contrast',
	locale = 'locale',
	consent = 'consent',
}

export enum UiSettings {
	day = 'day',
	night = 'night',
	blend = 'blend',
	contrast = 'contrast',
}
