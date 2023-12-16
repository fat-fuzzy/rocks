const brightness = [
	{id: 'brightness.day', text: 'day', asset: 'emoji:day', value: 'day'},
	{
		id: 'brightness.night',
		text: 'night',
		asset: 'emoji:night',
		value: 'night',
	},
]

const contrast = [
	{
		id: 'app.settings.contrast.contrast',
		text: 'contrast',
		asset: 'emoji:contrast',
		value: 'contrast',
	},
	{
		id: 'app.settings.contrast.blend',
		text: 'blend',
		asset: 'emoji:blend', // TODO: night / day asset option
		value: 'blend',
	},
]

const container = [
	{id: 'container.center', text: 'center', value: 'center'},
	{id: 'container.burrito', text: 'burrito', value: 'burrito'},
]

const size = [
	{id: 'size.xs', text: 'xs', value: 'xs'},
	{id: 'size.sm', text: 'sm', value: 'sm'},
	{id: 'size.md', text: 'md', value: 'md'},
	{id: 'size.lg', text: 'lg', value: 'lg'},
	{id: 'size.xl', text: 'xl', value: 'xl'},
]

const layout = [
	{id: 'layout.stack', text: 'stack', value: 'stack'},
	{
		id: 'layout.switcher',
		text: 'switcher',
		value: 'switcher',
	},
]

const threshold = [
	{id: 'threshold.xs', text: 'xs', value: 'xs'},
	{id: 'threshold.sm', text: 'sm', value: 'sm'},
	{id: 'threshold.md', text: 'md', value: 'md'},
	{id: 'threshold.lg', text: 'lg', value: 'lg'},
	{id: 'threshold.xl', text: 'xl', value: 'xl'},
]

const breakpoint = [
	{id: 'breakpoint.xs', text: 'xs', value: 'xs'},
	{id: 'breakpoint.sm', text: 'sm', value: 'sm'},
	{id: 'breakpoint.md', text: 'md', value: 'md'},
	{id: 'breakpoint.lg', text: 'lg', value: 'lg'},
	{id: 'breakpoint.xl', text: 'xl', value: 'xl'},
]

const color = [
	{
		id: 'color.primary',
		text: 'primary',
		variant: 'outline',
		color: 'primary',
		value: 'primary',
	},
	{
		id: 'color.accent',
		text: 'accent',
		variant: 'outline',
		color: 'accent',
		value: 'accent',
	},
	{
		id: 'color.highlight',
		text: 'highlight',
		variant: 'outline',
		color: 'highlight',
		value: 'highlight',
	},
]

const variant = [
	{id: 'variant.fill', text: 'fill', value: 'fill'},
	{id: 'variant.outline', text: 'outline', value: 'outline'},
	{id: 'variant.bare', text: 'bare', value: 'bare'},
]

const status = [
	{
		id: 'status.default',
		text: 'default',
		color: 'default',
		asset: 'emoji:default',
		value: 'default',
	},
	{
		id: 'status.info',
		text: 'info',
		color: 'info',
		asset: 'emoji:info',
		value: 'info',
	},
	{
		id: 'status.success',
		text: 'success',
		color: 'success',
		asset: 'emoji:success',
		value: 'success',
	},
	{
		id: 'status.warning',
		text: 'warning',
		color: 'warning',
		asset: 'emoji:warning',
		value: 'warning',
	},
	{
		id: 'status.error',
		text: 'error',
		color: 'error',
		asset: 'emoji:error',
		value: 'error',
	},
]

const context = [
	{id: 'context.form', text: 'form', value: 'form'},
	{id: 'context.code', text: 'code', value: 'code'},
]

const emoji = [
	{
		id: 'asset.profile',
		text: 'profile',
		value: 'emoji:profile',
		asset: 'emoji:profile',
	},
	{
		id: 'asset.favorite',
		text: 'favorite',
		value: 'emoji:favorite',
		asset: 'emoji:favorite',
	},
	{
		id: 'asset.idea',
		text: 'idea',
		value: 'emoji:idea',
		asset: 'emoji:idea',
	},
	{
		id: 'asset.default',
		text: 'default',
		value: 'emoji',
		asset: 'emoji',
	},
]

const asset = {
	emoji,
}

const content = [
	{id: 'content.card', text: 'card', value: 'card'},
	{id: 'content.form', text: 'form', value: 'form'},
	{id: 'content.text', text: 'text', value: 'text'},
]

const side = [
	{id: 'side.card', text: 'card', value: 'card'},
	{id: 'side.form', text: 'form', value: 'form'},
	{id: 'side.text', text: 'text', value: 'text'},
]

const main = [
	{id: 'main.card', text: 'card', value: 'card'},
	{id: 'main.form', text: 'form', value: 'form'},
	{id: 'main.text', text: 'text', value: 'text'},
]

export {
	brightness,
	contrast,
	container,
	size,
	layout,
	threshold,
	breakpoint,
	color,
	variant,
	status,
	context,
	asset,
	content,
	side,
	main,
}
