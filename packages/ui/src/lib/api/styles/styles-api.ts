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
		const layoutsStylesTree = this.layouts?.element?.getStyleTree() || {}

		return {
			tokens: tokensStylesTree,
			app: appStylesTree,
			shared: {
				...sharedContainerStylesTree,
				...sharedLayoutStylesTree,
			},
			blocks: blocksStylesTree,
			layouts: layoutsStylesTree,
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
		container: 'card:lg',
		size: 'sm',
		variant: '',
		items: [
			// new StyleInputGroup({
			// 	name: 'Color',
			// 	id: 'tokens.element.color',
			// 	value: 'day',
			// 	input: 'toggle',
			// 	layout: 'stack',
			// 	items: [
			// 		{id: 'tokens.element.color.primary', text: 'primary', asset: '', value: 'primary'},
			// 		{id: 'tokens.element.color.accent', text: 'accent', asset: '', value: 'accent'},
			// 		{
			// 			id: 'tokens.element.color.highlight',
			// 			text: 'highlight',
			// 			asset: '',
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
			// 		{id: 'tokens.element.typography.h1', text: 'h1', asset: '', value: 'h1'},
			// 		{id: 'tokens.element.typography.h2', text: 'h2', asset: '', value: 'h2'},
			// 		{id: 'tokens.element.typography.h3', text: 'h3', asset: '', value: 'h3'},
			// 		{id: 'tokens.element.typography.h4', text: 'h4', asset: '', value: 'h4'},
			// 		{id: 'tokens.element.typography.h5', text: 'h5', asset: '', value: 'h5'},
			// 		{id: 'tokens.element.typography.h6', text: 'h6', asset: '', value: 'h6'},
			// 		{id: 'tokens.element.typography.font=lg', text: 'font=lg', asset: '', value: 'font=lg'},
			// 		{id: 'tokens.element.typography.font-md', text: 'font-md', asset: '', value: 'font-md'},
			// 		{id: 'tokens.element.typography.font-sm', text: 'font-sm', asset: '', value: 'font-sm'},
			// 		{id: 'tokens.element.typography.font-xs', text: 'font-xs', asset: '', value: 'font-xs'},
			// 		{id: 'tokens.element.typography.pre', text: 'pre', asset: '', value: 'pre'},
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
		layout: 'switcher',
		container: 'card:lg',
		size: 'sm',
		variant: '',
		items: [
			new StyleInputGroup({
				name: 'Brightness',
				id: 'app.settings.brightness',
				value: 'day',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				items: [
					{id: 'app.settings.brightness.day', text: 'day', asset: '☀️', value: 'day'},
					{id: 'app.settings.brightness.night', text: 'night', asset: '🌙', value: 'night'},
				],
			}),
			new StyleInputGroup({
				name: 'Contrast',
				id: 'app.settings.contrast',
				value: 'blend',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				items: [
					{id: 'app.settings.contrast.contrast', text: 'contrast', asset: '🌗', value: 'contrast'}, // TODO : fix color vars & classes
					{id: 'app.settings.contrast.blend', text: 'blend', asset: '🌑', value: 'blend'}, // TODO: night / day asset option
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
		layout: 'switcher',
		container: 'card:lg',
		size: 'sm',
		variant: '',
		id: 'shared.container',
		exclude: ['Color', 'Typography', 'ActionLabel', 'Button', 'Toggle'],
		items: [
			new StyleInputGroup({
				name: 'Container',
				id: 'shared.container.container',
				value: '',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				exclude: ['Stack', 'Burrito'],
				items: [
					{id: 'shared.container.container.center', text: 'center', asset: '', value: 'center'},
					{id: 'shared.container.container.burrito', text: 'burrito', asset: '', value: 'burrito'},
				],
			}),
			new StyleInputGroup({
				name: 'Size', // TODO: use 'spacing' instead of 'size' in data
				id: 'shared.container.size',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				variant: '',
				exclude: ['Nav', 'Stack', 'Burrito'],
				items: [
					{id: 'shared.container.size.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'shared.container.size.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'shared.container.size.md', text: 'md', asset: '', value: 'md'},
					{id: 'shared.container.size.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'shared.container.size.xl', text: 'xl', asset: '', value: 'xl'},
				],
			}),
		],
	}),
	layout: new StyleFamily({
		name: 'Layout',
		title: '',
		layout: 'switcher',
		container: 'card:lg',
		size: 'sm',
		variant: '',
		id: 'shared.layout',
		exclude: ['Color', 'Typography', 'ActionLabel', 'Button', 'Toggle'],
		items: [
			new StyleInputGroup({
				name: 'Layout',
				id: 'shared.layout.layout',
				value: 'switcher',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				exclude: [
					'compositions',
					'layouts',
					'Switcher',
					'Reveal',
					'Feedback',
					'Stack',
					'Switcher',
					'Burrito',
					'Sidebar',
					'Nav',
					'RevealNav',
					'Header',
					'LogIn',
				],
				items: [
					{id: 'shared.layout.layout.stack', text: 'stack', asset: '', value: 'stack'},
					{
						id: 'shared.layout.layout.switcher',
						text: 'switcher',
						asset: '',
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
						// 			{id: 'xs', text: 'xs', asset: '', value: ''},
						// 			{id: 'sm', text: 'sm', asset: '', value: ''},
						// 			{id: 'md', text: 'md', asset: '', value: ''},
						// 			{id: 'lg', text: 'lg', asset: '', value: ''},
						// 			{id: 'xl', text: 'xl', asset: '', value: ''},
						// 		],
						// 	},
						// ],
					},
				],
			}),
			new StyleInputGroup({
				name: 'Breakpoint',
				id: 'shared.layout.breakpoint',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				variant: '',
				exclude: [
					'compositions',
					'layouts',
					'Reveal',
					'Feedback',
					'Stack',
					'Switcher',
					'Sidebar',
					'Burrito',
					'Sidebar',
					'Nav',
					'RevealNav',
					'Header',
					'LogIn',
				],
				items: [
					{id: 'shared.layout.breakpoint.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'shared.layout.breakpoint.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'shared.layout.breakpoint.md', text: 'md', asset: '', value: 'md'},
					{id: 'shared.layout.breakpoint.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'shared.layout.breakpoint.xl', text: 'xl', asset: '', value: 'xl'},
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
		container: 'card:lg',
		size: 'md',
		variant: '',
		items: [
			new StyleInputGroup({
				name: 'Color',
				id: 'blocks.element.color',
				value: '',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
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
				name: 'Status',
				id: 'blocks.element.status',
				value: 'default',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				include: ['Feedback'],
				items: [
					{
						id: 'blocks.element.status.info',
						text: 'info',
						asset: '💡',
						color: 'info',
						value: 'info',
					},
					{
						id: 'blocks.element.status.success',
						text: 'success',
						asset: '🎉',
						color: 'success',
						value: 'success',
					},
					{
						id: 'blocks.element.status.warning',
						text: 'warning',
						asset: '🦁',
						color: 'warning',
						value: 'warning',
					},
					{
						id: 'blocks.element.status.error',
						text: 'error',
						asset: '💩',
						color: 'error',
						value: 'error',
					},
				],
			}),
			new StyleInputGroup({
				name: 'Context',
				id: 'blocks.element.context',
				value: 'default',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				include: ['Feedback'],
				items: [
					{id: 'blocks.element.context.form', text: 'form', asset: '', value: 'form'},
					{id: 'blocks.element.context.code', text: 'code', asset: '', value: 'code'},
				],
			}),
			new StyleInputGroup({
				name: 'Variant',
				id: 'blocks.element.variant',
				value: 'default',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				exclude: ['ActionLabel', 'InputCheck', 'InputRadio', 'InputRange', 'InputFile'],
				items: [
					{id: 'blocks.element.variant.default', text: 'default', asset: '', value: 'default'},
					{id: 'blocks.element.variant.outline', text: 'outline', asset: '', value: 'outline'},
					{id: 'blocks.element.variant.bare', text: 'bare', asset: '', value: 'bare'},
				],
			}),
			new StyleInputGroup({
				name: 'Size',
				id: 'blocks.element.size',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				variant: '',
				exclude: ['ActionLabel'],
				items: [
					{id: 'blocks.element.size.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'blocks.element.size.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'blocks.element.size.md', text: 'md', asset: '', value: 'md'},
					{id: 'blocks.element.size.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'blocks.element.size.xl', text: 'xl', asset: '', value: 'xl'},
				],
			}),
			new StyleInputGroup({
				name: 'Asset', // TODO: Add hint: "Icon: emoji / SVG"
				id: 'blocks.element.asset',
				value: '',
				input: 'datalist',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				exclude: [
					'ButtonMenu',
					'ToggleMenu',
					'InputCheck',
					'InputRadio',
					'InputRange',
					'InputFile',
				],
				items: [
					{id: 'blocks.element.asset.cat', text: 'cat', asset: '🦁', value: 'cat'},
					{id: 'blocks.element.asset.love', text: 'love', asset: '❤️', value: 'love'},
					{id: 'blocks.element.asset.sparkles', text: 'sparkles', asset: '✨', value: 'sparkles'},
				],
			}),
		],
	}),
}

const layouts: LayoutStyles = {
	element: new StyleFamily({
		name: 'Element',
		title: '',
		id: 'layouts.element',
		layout: 'switcher',
		container: 'card:lg',
		size: 'md',
		variant: '',
		items: [
			new StyleInputGroup({
				name: 'Content',
				id: 'layouts.element.content',
				value: 'card',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				exclude: ['Sidebar'],
				items: [
					{id: 'layouts.element.content.card', text: 'card', asset: '', value: 'card'},
					{id: 'layouts.element.content.form', text: 'form', asset: '', value: 'form'},
					{id: 'layouts.element.content.text', text: 'text', asset: '', value: 'text'},
				],
			}),
			new StyleInputGroup({
				name: 'Side',
				id: 'layouts.element.side',
				value: 'card',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				include: ['Sidebar'],
				items: [
					{id: 'layouts.element.side.card', text: 'card', asset: '', value: 'card'},
					{id: 'layouts.element.side.form', text: 'form', asset: '', value: 'form'},
					{id: 'layouts.element.side.text', text: 'text', asset: '', value: 'text'},
				],
			}),
			new StyleInputGroup({
				name: 'Main',
				id: 'layouts.element.main',
				value: 'text',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				include: ['Sidebar'],
				items: [
					{id: 'layouts.element.main.card', text: 'card', asset: '', value: 'card'},
					{id: 'layouts.element.main.form', text: 'form', asset: '', value: 'form'},
					{id: 'layouts.element.main.text', text: 'text', asset: '', value: 'text'},
				],
			}),
			new StyleInputGroup({
				name: 'Size', // TODO: use 'spacing' instead of 'size' in data
				id: 'layouts.element.size',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				variant: '',
				items: [
					{id: 'layouts.element.size.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'layouts.element.size.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'layouts.element.size.md', text: 'md', asset: '', value: 'md'},
					{id: 'layouts.element.size.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'layouts.element.size.xl', text: 'xl', asset: '', value: 'xl'},
				],
			}),
			new StyleInputGroup({
				name: 'Breakpoint',
				id: 'layouts.element.breakpoint',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				variant: '',
				include: ['Switcher'],
				items: [
					{id: 'layouts.element.breakpoint.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'layouts.element.breakpoint.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'layouts.element.breakpoint.md', text: 'md', asset: '', value: 'md'},
					{id: 'layouts.element.breakpoint.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'layouts.element.breakpoint.xl', text: 'xl', asset: '', value: 'xl'},
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
		layout: {layout: 'switcher', breakpoint: 'md'},
		container: {container: 'center', size: 'md'},
	},
	blocks: {
		element: {
			variant: 'default',
			color: '',
			status: 'info',
			context: 'form',
			// theme: {theme: 'ui'}, // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component content): maybe: use web components ?
			asset: '✨',
			size: 'md',
		},
	},
	layouts: {
		element: {size: 'md', content: 'card', side: 'card', main: 'text', breakpoint: 'md'},
	},
}
