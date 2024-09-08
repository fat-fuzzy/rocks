export enum UiState {
	active = 'active',
	inactive = 'inactive',
	expanded = 'expanded',
	collapsed = 'collapsed',
}

export enum UiStatus {
	default = 'default',
	info = 'info',
	success = 'success',
	warning = 'warning',
	error = 'error',
}

export enum UiSettings {
	brightness = 'brightness',
	contrast = 'contrast',
	locale = 'locale',
}

export enum UiTextContext {
	form = 'form',
	prose = 'prose',
	code = 'code',
}

export enum ButtonEvent {
	expand = 'expand',
	collapse = 'collapse',
	toggle = 'toggle',
	switch = 'switch',
	click = 'click',
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
