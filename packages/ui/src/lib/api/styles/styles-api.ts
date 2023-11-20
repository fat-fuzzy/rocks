import type {
	AppStyles,
	TokenStyles,
	SharedStyles,
	BlockStyles,
	LayoutStyles,
	StyleOptions,
	StyleTree,
	StyleCategory,
} from './types'
import {StyleInputGroup, StyleFamily} from './types'

export class StylesApi {
	tokens: TokenStyles
	app: AppStyles
	shared: SharedStyles
	blocks: BlockStyles
	layouts: LayoutStyles

	constructor({tokens, app, shared, blocks, layouts}: StyleOptions) {
		this.tokens = tokens
		this.app = app
		this.shared = shared
		this.blocks = blocks
		this.layouts = layouts
	}

	getFormOptions(category: string): StyleCategory {
		return this.getCategoryOptions(category)
	}

	getCategoryOptions(category: string): StyleCategory {
		switch (category) {
			case 'tokens':
				return this.tokens
			case 'app':
				return this.app
			case 'shared':
				return this.shared
			case 'blocks':
				return this.blocks
			case 'layouts':
				return this.layouts
			default:
				return {}
		}
	}

	geAllOptions(): StyleOptions {
		return {
			tokens: this.tokens,
			app: this.app,
			shared: this.shared,
			blocks: this.blocks,
			layouts: this.layouts,
		}
	}

	getStyleTree(): StyleTree {
		// TODO: loop for [X] style families
		const tokensStylesTree = this.tokens?.element?.getStyleTree() || {}
		const appStylesTree = this.app?.settings?.getStyleTree() || {}
		const sharedContainerStylesTree = this.shared?.container?.getStyleTree() || {}
		const sharedLayoutStylesTree = this.shared?.layout?.getStyleTree() || {}
		const blocksStylesTree = this.blocks?.element?.getStyleTree() || {}
		const layoutsContentStylesTree = this.layouts?.content?.getStyleTree() || {}
		const layoutsLayoutStylesTree = this.layouts?.element?.getStyleTree() || {}

		return {
			tokens: tokensStylesTree,
			app: appStylesTree,
			shared: {
				...sharedContainerStylesTree,
				...sharedLayoutStylesTree,
			},
			blocks: blocksStylesTree,
			layouts: {
				...layoutsContentStylesTree,
				...layoutsLayoutStylesTree,
			},
		}
	}

	applyStyles(updatedStyles: StyleTree) {
		Object.keys(updatedStyles).map((updatedCategory) => {
			const category = updatedStyles[updatedCategory]
			let families: string[] = []
			let styles: StyleCategory

			switch (updatedCategory) {
				case 'tokens':
					families = Object.keys(this.tokens)
					styles = this.tokens
					break
				case 'app':
					families = Object.keys(this.app)
					styles = this.app
					break
				case 'shared':
					families = Object.keys(this.shared)
					styles = this.shared
					break
				case 'blocks':
					families = Object.keys(this.blocks)
					styles = this.blocks
					break
				case 'layouts':
					families = Object.keys(this.layouts)
					styles = this.layouts
					break
			}
			families.map((family) => {
				const updatedFamily = category[family]
				styles[family].applyStyles(updatedFamily)
			})
		})
	}
}

const tokens: TokenStyles = {
	element: new StyleFamily({
		name: 'Design',
		title: '',
		id: 'tokens.element',
		layout: 'switcher',
		size: 'lg',
		variant: 'card',
		items: [
			// new StyleInputGroup({
			// 	name: 'Color',
			// 	id: 'tokens.element.color',
			// 	value: 'day',
			// 	input: 'toggle',
			// 	layout: 'stack',
			// 	items: [
			// 		{id: 'tokens.element.color.primary', text: 'primary', value: 'primary'},
			// 		{id: 'tokens.element.color.accent', text: 'accent', value: 'accent'},
			// 		{
			// 			id: 'tokens.element.color.highlight',
			// 			text: 'highlight',
			// 			value: 'highlight',
			// 		},
			// 	],
			// }),
			// new StyleInputGroup({
			// 	name: 'Typography',
			// 	id: 'tokens.element.typography',
			// 	value: 'blend',
			// 	input: 'toggle',
			// 	layout: 'stack',
			// 	items: [
			// 		{id: 'tokens.element.typography.h1', text: 'h1', value: 'h1'},
			// 		{id: 'tokens.element.typography.h2', text: 'h2', value: 'h2'},
			// 		{id: 'tokens.element.typography.h3', text: 'h3', value: 'h3'},
			// 		{id: 'tokens.element.typography.h4', text: 'h4', value: 'h4'},
			// 		{id: 'tokens.element.typography.h5', text: 'h5', value: 'h5'},
			// 		{id: 'tokens.element.typography.h6', text: 'h6', value: 'h6'},
			// 		{id: 'tokens.element.typography.font=lg', text: 'font=lg', value: 'font=lg'},
			// 		{id: 'tokens.element.typography.font-md', text: 'font-md', value: 'font-md'},
			// 		{id: 'tokens.element.typography.font-sm', text: 'font-sm', value: 'font-sm'},
			// 		{id: 'tokens.element.typography.font-xs', text: 'font-xs', value: 'font-xs'},
			// 		{id: 'tokens.element.typography.pre', text: 'pre', value: 'pre'},
			// 	],
			// }),
		],
	}),
}

const app: AppStyles = {
	settings: new StyleFamily({
		name: 'Settings',
		title: '',
		id: 'app.settings',
		layout: 'flex',
		size: 'lg',
		variant: 'card',
		items: [
			new StyleInputGroup({
				name: 'Brightness',
				id: 'app.settings.brightness',
				value: 'day',
				input: 'radio',
				layout: 'stack',
				size: 'sm',
				variant: 'box card',
				items: [
					{id: 'app.settings.brightness.day', text: 'day', asset: 'emoji:day', value: 'day'},
					{
						id: 'app.settings.brightness.night',
						text: 'night',
						asset: 'emoji:night',
						value: 'night',
					},
				],
			}),
			new StyleInputGroup({
				name: 'Contrast',
				id: 'app.settings.contrast',
				value: 'blend',
				input: 'radio',
				layout: 'stack',
				size: 'sm',
				variant: 'box card',
				items: [
					{
						id: 'app.settings.contrast.contrast',
						text: 'contrast',
						asset: 'emoji:contrast',
						value: 'contrast',
					}, // TODO : fix color vars & classes
					{
						id: 'app.settings.contrast.blend',
						text: 'blend',
						asset: 'emoji:blend',
						value: 'blend',
					}, // TODO: night / day asset option
					// {id: 'polar', label: 'polar', value: ''},
				],
			}),
		],
	}),
	// TODO : figure out if it is possible to do a dynamic import of app theme
	// theme: {
	// 	name: 'Theme',
	// 	items: [
	// 		{
	// 			name: 'Theme',
	// 			input: 'toggle',
	// 			layout: 'switcher',
	// 			items: [
	// 				{id: 'ui', label: 'ui'},
	// 				{id: 'doc', label: 'doc'},
	// 				{id: 'website', label: 'website'},
	// 			],
	// 		},
	// 	],
	// },
}

const shared: SharedStyles = {
	container: new StyleFamily({
		name: 'Container',
		title: '',
		layout: 'flex grow',
		size: 'lg',
		variant: 'card',
		id: 'shared.container',
		exclude: ['Color', 'Typography', 'ActionLabel', 'Button', 'Toggle', 'RevealAuto'],
		items: [
			new StyleInputGroup({
				name: 'Container',
				id: 'shared.container.container',
				value: '',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				container: 'card',
				exclude: ['Stack', 'Burrito'],
				items: [
					{id: 'shared.container.container.center', text: 'center', value: 'center'},
					{id: 'shared.container.container.burrito', text: 'burrito', value: 'burrito'},
				],
			}),
			new StyleInputGroup({
				name: 'Size', // TODO: use 'spacing' instead of 'size' in data
				id: 'shared.container.size',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				container: 'card',
				exclude: ['Nav', 'Stack', 'Burrito'],
				items: [
					{id: 'shared.container.size.xs', text: 'xs', value: 'xs'},
					{id: 'shared.container.size.sm', text: 'sm', value: 'sm'},
					{id: 'shared.container.size.md', text: 'md', value: 'md'},
					{id: 'shared.container.size.lg', text: 'lg', value: 'lg'},
					{id: 'shared.container.size.xl', text: 'xl', value: 'xl'},
				],
			}),
		],
	}),
	layout: new StyleFamily({
		name: 'Layout',
		title: '',
		layout: 'flex grow',
		container: 'card',
		size: 'lg',
		variant: '',
		id: 'shared.layout',
		exclude: ['Color', 'Typography', 'ActionLabel', 'Button', 'Toggle', 'Feedback', 'RevealAuto'],
		items: [
			new StyleInputGroup({
				name: 'Layout',
				id: 'shared.layout.layout',
				value: 'switcher',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				container: 'card',
				exclude: [
					'compositions',
					'layouts',
					'Switcher',
					'Reveal',
					'Stack',
					'Switcher',
					'Burrito',
					'Sidebar',
					'Nav',
					'RevealNav',
					'Header',
					'LogIn',
					'InputCheck',
					'InputRadio',
					'InputFile',
					'InputRange',
				],
				items: [
					{id: 'shared.layout.layout.stack', text: 'stack', value: 'stack'},
					{
						id: 'shared.layout.layout.switcher',
						text: 'switcher',
						value: 'switcher',
						// options: [
						// 	//TODO: display breakpoint options conditionally
						// 	{
						// 		name: 'Breakpoint',
						// 		input: 'toggle',
						//
						// layout: 'stack',
						// 		exclude: ['Button', 'Toggle', 'Nav', 'Stack', 'Burrito'],
						// 		items: [
						// 			{id: 'xs', text: 'xs', value: ''},
						// 			{id: 'sm', text: 'sm', value: ''},
						// 			{id: 'md', text: 'md', value: ''},
						// 			{id: 'lg', text: 'lg', value: ''},
						// 			{id: 'xl', text: 'xl', value: ''},
						// 		],
						// 	},
						// ],
					},
				],
			}),
			new StyleInputGroup({
				name: 'Threshold',
				id: 'shared.layout.threshold',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				container: 'card',
				exclude: [
					'blocks',
					'compositions',
					'layouts',
					'Switcher',
					'Reveal',
					'Stack',
					'Switcher',
					'Burrito',
					'Sidebar',
					'Nav',
					'Header',
					'LogIn',
					'InputCheck',
					'InputRadio',
					'InputFile',
					'InputRange',
				],
				include: ['RevealNav', 'ButtonMenu', 'ToggleMenu'],
				items: [
					{id: 'shared.layout.threshold.xs', text: 'xs', value: 'xs'},
					{id: 'shared.layout.threshold.sm', text: 'sm', value: 'sm'},
					{id: 'shared.layout.threshold.md', text: 'md', value: 'md'},
					{id: 'shared.layout.threshold.lg', text: 'lg', value: 'lg'},
					{id: 'shared.layout.threshold.xl', text: 'xl', value: 'xl'},
				],
			}),
			new StyleInputGroup({
				name: 'Breakpoint',
				id: 'shared.layout.breakpoint',
				value: 'xl',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				container: 'card',
				exclude: [
					'compositions',
					'layouts',
					'Reveal',
					'Stack',
					'Switcher',
					'Sidebar',
					'Burrito',
					'Sidebar',
					'Nav',
					'RevealNav',
					'LogIn',
					'ButtonMenu',
					'ToggleMenu',
					'RevealMenu',
					'InputCheck',
					'InputRadio',
					'InputFile',
					'InputRange',
				],
				items: [
					{id: 'shared.layout.breakpoint.xs', text: 'xs', value: 'xs'},
					{id: 'shared.layout.breakpoint.sm', text: 'sm', value: 'sm'},
					{id: 'shared.layout.breakpoint.md', text: 'md', value: 'md'},
					{id: 'shared.layout.breakpoint.lg', text: 'lg', value: 'lg'},
					{id: 'shared.layout.breakpoint.xl', text: 'xl', value: 'xl'},
				],
			}),
		],
	}),
}

const blocks: BlockStyles = {
	element: new StyleFamily({
		name: 'Element',
		title: '',
		id: 'blocks.element',
		layout: 'switcher',
		size: 'xs',
		variant: 'card:xl',
		items: [
			new StyleInputGroup({
				name: 'Color',
				id: 'blocks.element.color',
				value: '',
				input: 'toggle',
				layout: 'switcher',
				size: 'xxs',
				container: 'card',
				exclude: ['ActionLabel', 'Feedback'],
				items: [
					{
						id: 'blocks.element.color.primary',
						text: 'primary',
						variant: 'outline',
						color: 'primary',
						value: 'primary',
					},
					{
						id: 'blocks.element.color.accent',
						text: 'accent',
						variant: 'outline',
						color: 'accent',
						value: 'accent',
					},
					{
						id: 'blocks.element.color.highlight',
						text: 'highlight',
						variant: 'outline',
						color: 'highlight',
						value: 'highlight',
					},
				],
			}),
			new StyleInputGroup({
				name: 'Variant',
				id: 'blocks.element.variant',
				value: 'fill',
				input: 'radio',
				layout: 'stack',
				size: 'sm',
				variant: 'box card',
				exclude: ['ActionLabel', 'InputCheck', 'InputRadio', 'InputRange', 'InputFile'],
				items: [
					{id: 'blocks.element.variant.fill', text: 'fill', value: 'fill'},
					{id: 'blocks.element.variant.outline', text: 'outline', value: 'outline'},
					{id: 'blocks.element.variant.bare', text: 'bare', value: 'bare'},
				],
			}),
			new StyleInputGroup({
				name: 'Size',
				id: 'blocks.element.size',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				variant: 'grow card',
				exclude: ['ActionLabel'],
				items: [
					{id: 'blocks.element.size.xs', text: 'xs', value: 'xs'},
					{id: 'blocks.element.size.sm', text: 'sm', value: 'sm'},
					{id: 'blocks.element.size.md', text: 'md', value: 'md'},
					{id: 'blocks.element.size.lg', text: 'lg', value: 'lg'},
					{id: 'blocks.element.size.xl', text: 'xl', value: 'xl'},
				],
			}),
			new StyleInputGroup({
				name: 'Status',
				id: 'blocks.element.status',
				value: 'default',
				input: 'radio',
				layout: 'stack',
				size: 'sm',
				variant: 'box card',
				exclude: [
					'ActionLabel',
					'Button',
					'Toggle',
					'InputCheck',
					'InputFile',
					'InputRadio',
					'InputRange',
				],
				include: ['Feedback'],
				items: [
					{
						id: 'blocks.element.status.default',
						text: 'default',
						color: 'default',
						asset: 'emoji:default',
						value: 'default',
					},
					{
						id: 'blocks.element.status.info',
						text: 'info',
						color: 'info',
						asset: 'emoji:info',
						value: 'info',
					},
					{
						id: 'blocks.element.status.success',
						text: 'success',
						color: 'success',
						asset: 'emoji:success',
						value: 'success',
					},
					{
						id: 'blocks.element.status.warning',
						text: 'warning',
						color: 'warning',
						asset: 'emoji:warning',
						value: 'warning',
					},
					{
						id: 'blocks.element.status.error',
						text: 'error',
						color: 'error',
						asset: 'emoji:error',
						value: 'error',
					},
				],
			}),
			new StyleInputGroup({
				name: 'Context',
				id: 'blocks.element.context',
				value: 'form',
				input: 'radio',
				layout: 'stack',
				size: 'sm',
				container: '',
				variant: 'box card',
				exclude: [
					'ActionLabel',
					'Button',
					'Toggle',
					'InputCheck',
					'InputFile',
					'InputRadio',
					'InputRange',
				],
				include: ['Feedback'],
				items: [
					{id: 'blocks.element.context.form', text: 'form', value: 'form'},
					{id: 'blocks.element.context.code', text: 'code', value: 'code'},
				],
			}),
			new StyleInputGroup({
				name: 'Asset', // TODO: Add hint: "Icon: emoji / SVG"
				id: 'blocks.element.asset',
				value: 'default',
				input: 'toggle',
				layout: 'switcher',
				size: 'xxs',
				variant: 'card',
				exclude: ['ButtonMenu', 'ToggleMenu', 'InputRange', 'InputFile'],
				items: [
					{
						id: 'blocks.element.asset.profile',
						text: 'profile',
						value: 'emoji:profile',
						asset: 'emoji:profile',
					},
					{
						id: 'blocks.element.asset.favorite',
						text: 'favorite',
						value: 'emoji:favorite',
						asset: 'emoji:favorite',
					},
					{
						id: 'blocks.element.asset.idea',
						text: 'idea',
						value: 'emoji:idea',
						asset: 'emoji:idea',
					},
					{
						id: 'blocks.element.asset.default',
						text: 'default',
						value: 'emoji',
						asset: 'emoji',
					},
				],
			}),
		],
	}),
}

const layouts: LayoutStyles = {
	content: new StyleFamily({
		name: 'Content',
		title: '',
		id: 'layouts.content',
		layout: 'switcher',
		size: 'md',
		variant: 'card',
		items: [
			new StyleInputGroup({
				name: 'Content',
				id: 'layouts.content.content',
				value: 'card',
				input: 'radio',
				layout: 'stack',
				size: 'sm',
				variant: 'box card',
				exclude: ['layouts', 'Sidebar'],
				include: ['Burrito', 'Reveal', 'RevealAuto', 'Stack', 'Switcher'],
				items: [
					{id: 'layouts.content.content.card', text: 'card', value: 'card'},
					{id: 'layouts.content.content.form', text: 'form', value: 'form'},
					{id: 'layouts.content.content.text', text: 'text', value: 'text'},
				],
			}),
			new StyleInputGroup({
				name: 'Side',
				id: 'layouts.content.side',
				value: 'card',
				input: 'radio',
				layout: 'stack',
				size: 'sm',
				variant: 'box card',
				exclude: ['layouts'],
				include: ['Sidebar'],
				items: [
					{id: 'layouts.content.side.card', text: 'card', value: 'card'},
					{id: 'layouts.content.side.form', text: 'form', value: 'form'},
					{id: 'layouts.content.side.text', text: 'text', value: 'text'},
				],
			}),
			new StyleInputGroup({
				name: 'Main',
				id: 'layouts.content.main',
				value: 'text',
				input: 'radio',
				layout: 'stack',
				size: 'sm',
				variant: 'box card',
				exclude: ['layouts'],
				include: ['Sidebar'],
				items: [
					{id: 'layouts.content.main.card', text: 'card', value: 'card'},
					{id: 'layouts.content.main.form', text: 'form', value: 'form'},
					{id: 'layouts.content.main.text', text: 'text', value: 'text'},
				],
			}),
		],
	}),
	element: new StyleFamily({
		name: 'Element',
		title: '',
		id: 'layouts.element',
		layout: 'switcher',
		size: 'lg',
		variant: 'card',
		items: [
			new StyleInputGroup({
				name: 'Size', // TODO: use 'spacing' instead of 'size' in data
				id: 'layouts.element.size',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				items: [
					{id: 'layouts.element.size.xs', text: 'xs', value: 'xs'},
					{id: 'layouts.element.size.sm', text: 'sm', value: 'sm'},
					{id: 'layouts.element.size.md', text: 'md', value: 'md'},
					{id: 'layouts.element.size.lg', text: 'lg', value: 'lg'},
					{id: 'layouts.element.size.xl', text: 'xl', value: 'xl'},
				],
			}),
			new StyleInputGroup({
				name: 'Threshold',
				id: 'layouts.element.threshold',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				exclude: ['layouts'],
				include: ['Switcher', 'RevealAuto'],
				items: [
					{id: 'layouts.element.threshold.xs', text: 'xs', value: 'xs'},
					{id: 'layouts.element.threshold.sm', text: 'sm', value: 'sm'},
					{id: 'layouts.element.threshold.md', text: 'md', value: 'md'},
					{id: 'layouts.element.threshold.lg', text: 'lg', value: 'lg'},
					{id: 'layouts.element.threshold.xl', text: 'xl', value: 'xl'},
				],
			}),
		],
	}),
}

export const initStyles = () => new StylesApi({tokens, app, shared, blocks, layouts})

export const DEFAULT_STYLES: StyleTree = {
	tokens: {
		element: {color: 'primary', typography: 'h1'},
	},
	app: {
		settings: {
			brightness: 'day',
			contrast: 'blend',
		} /* theme: {theme: 'ui'} // TODO : figure out if it is possible to do a dynamic import of app theme */,
	},
	shared: {
		layout: {layout: 'switcher', breakpoint: 'xl'}, // need large breakpoint for Header default demo
		container: {container: 'center', size: 'md'},
	},
	blocks: {
		element: {
			variant: 'fill',
			color: '',
			status: 'default',
			context: 'form',
			// theme: {theme: 'ui'}, // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component content): maybe: use web components ?
			asset: 'emoji',
			size: 'md',
		},
	},
	layouts: {
		content: {content: 'card', side: 'card', main: 'text'},
		element: {size: 'md', breakpoint: 'lg'},
	},
}
