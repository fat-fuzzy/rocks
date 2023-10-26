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
	app: AppStyles
	shared: SharedStyles
	blocks: BlockStyles
	layouts: LayoutStyles

	constructor({app, shared, blocks, layouts}: StyleOptions) {
		this.app = app
		this.shared = shared
		this.blocks = blocks
		this.layouts = layouts
	}

	getFormOptions(categories: string[]): StyleCategory[] {
		return categories.map((cat) => this.getCategoryOptions(cat))
	}

	getCategoryOptions(category: string): StyleCategory {
		switch (category) {
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
			app: this.app,
			shared: this.shared,
			blocks: this.blocks,
			layouts: this.layouts,
		}
	}

	getStyleTree(): StyleTree {
		// TODO: loop for [X] style families
		const appStylesTree = this.app?.settings?.getStyleTree() || {}
		const sharedStylesTree = this.shared?.context?.getStyleTree() || {}
		const blocksStylesTree = this.blocks?.element?.getStyleTree() || {}
		const layoutsStylesTree = this.layouts?.element?.getStyleTree() || {}

		return {
			app: appStylesTree,
			shared: sharedStylesTree,
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

const app: AppStyles = {
	settings: new StyleFamily({
		name: 'Settings',
		title: '',
		id: 'app.settings',
		layout: 'switcher',
		container: '',
		size: 'xxs',
		items: [
			new StyleInputGroup({
				name: 'Brightness',
				id: 'app.settings.brightness',
				value: 'day',
				input: 'toggle',
				layout: 'stack',
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

const tokens: TokenStyles = {
	element: new StyleFamily({
		name: 'Design',
		title: '',
		id: 'tokens.element',
		layout: 'switcher',
		container: '',
		size: 'xxs',
		items: [
			new StyleInputGroup({
				name: 'Color',
				id: 'tokens.element.color',
				value: 'day',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'tokens.element.color.primary', text: 'primary', asset: '', value: 'primary'},
					{id: 'tokens.element.color.accent', text: 'accent', asset: '', value: 'accent'},
					{
						id: 'tokens.element.color.highlight',
						text: 'highlight',
						asset: '',
						value: 'highlight',
					},
				],
			}),
			new StyleInputGroup({
				name: 'Typography',
				id: 'tokens.element.typography',
				value: 'blend',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'tokens.element.typography.h1', text: 'h1', asset: '', value: 'h1'},
					{id: 'tokens.element.typography.h2', text: 'h2', asset: '', value: 'h2'},
					{id: 'tokens.element.typography.h3', text: 'h3', asset: '', value: 'h3'},
					{id: 'tokens.element.typography.h4', text: 'h4', asset: '', value: 'h4'},
					{id: 'tokens.element.typography.h5', text: 'h5', asset: '', value: 'h5'},
					{id: 'tokens.element.typography.h6', text: 'h6', asset: '', value: 'h6'},
					{id: 'tokens.element.typography.font=lg', text: 'font=lg', asset: '', value: 'font=lg'},
					{id: 'tokens.element.typography.font-md', text: 'font-md', asset: '', value: 'font-md'},
					{id: 'tokens.element.typography.font-sm', text: 'font-sm', asset: '', value: 'font-sm'},
					{id: 'tokens.element.typography.font-xs', text: 'font-xs', asset: '', value: 'font-xs'},
					{id: 'tokens.element.typography.pre', text: 'pre', asset: '', value: 'pre'},
				],
			}),
		],
	}),
	settings: new StyleFamily({
		name: 'Settings',
		title: '',
		id: 'app.settings',
		layout: 'switcher',
		container: '',
		size: 'xxs',
		items: [
			new StyleInputGroup({
				name: 'Brightness',
				id: 'app.settings.brightness',
				value: 'day',
				input: 'toggle',
				layout: 'stack',
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
	context: new StyleFamily({
		name: 'Context',
		title: '',
		layout: 'switcher',
		container: '',
		size: 'sm',
		id: 'shared.context',
		exclude: [
			'Color',
			'Typography',
			'ActionLabel',
			'Button',
			'Toggle',
			'Stack',
			'Burrito',
			'Sidebar',
		],
		items: [
			new StyleInputGroup({
				name: 'Container',
				id: 'shared.context.container',
				value: '',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'shared.context.container.center', text: 'center', asset: '', value: 'center'},
					{id: 'shared.context.container.burrito', text: 'burrito', asset: '', value: 'burrito'},
				],
			}),
			new StyleInputGroup({
				name: 'Layout',
				id: 'shared.context.layout',
				value: 'switcher',
				input: 'toggle',
				layout: 'stack',
				exclude: ['compositions', 'layouts', 'Switcher', 'Reveal'],
				items: [
					{id: 'shared.context.layout.stack', text: 'stack', asset: '', value: 'stack'},
					{
						id: 'shared.context.layout.switcher',
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
				name: 'Size', // TODO: use 'spacing' instead of 'size' in data
				id: 'shared.context.size',
				value: 'md',
				input: 'toggle',
				layout: 'switcher',
				exclude: ['Nav'],
				items: [
					{id: 'shared.context.size.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'shared.context.size.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'shared.context.size.md', text: 'md', asset: '', value: 'md'},
					{id: 'shared.context.size.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'shared.context.size.xl', text: 'xl', asset: '', value: 'xl'},
				],
			}),
			new StyleInputGroup({
				name: 'Breakpoint',
				id: 'shared.context.breakpoint',
				value: 'md',
				input: 'toggle',
				layout: 'switcher',
				exclude: ['compositions', 'layouts', 'Reveal'],
				items: [
					{id: 'shared.context.breakpoint.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'shared.context.breakpoint.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'shared.context.breakpoint.md', text: 'md', asset: '', value: 'md'},
					{id: 'shared.context.breakpoint.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'shared.context.breakpoint.xl', text: 'xl', asset: '', value: 'xl'},
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
		container: '',
		size: 'sm',
		items: [
			new StyleInputGroup({
				name: 'Color',
				id: 'blocks.element.color',
				value: '',
				input: 'toggle',
				layout: 'stack',
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
				value: 'default',
				input: 'toggle',
				layout: 'stack',
				exclude: ['InputCheck', 'InputRadio', 'InputRange', 'InputFile'],
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
				input: 'toggle',
				layout: 'stack',
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
		container: '',
		size: 'sm',
		items: [
			new StyleInputGroup({
				name: 'Content',
				id: 'layouts.element.content',
				value: 'card',
				input: 'toggle',
				layout: 'stack',
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
				input: 'toggle',
				layout: 'switcher',
				items: [
					{id: 'layouts.element.size.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'layouts.element.size.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'layouts.element.size.md', text: 'md', asset: '', value: 'md'},
					{id: 'layouts.element.size.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'layouts.element.size.xl', text: 'xl', asset: '', value: 'xl'},
				],
			}),
		],
	}),
}

export const initStyles = () => new StylesApi({app, tokens, shared, blocks, layouts})

export const DEFAULT_STYLES: StyleTree = {
	app: {
		settings: {
			brightness: 'day',
			contrast: 'blend',
		} /* theme: {theme: 'ui'} // TODO : figure out if it is possible to do a dynamic import of app theme */,
	},
	shared: {
		context: {layout: 'switcher', container: 'center', size: 'md', breakpoint: 'md'},
	},
	blocks: {
		element: {
			variant: 'default',
			color: '',
			// theme: {theme: 'ui'}, // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component content): maybe: use web components ?
			asset: '✨',
			size: 'md',
		},
	},
	layouts: {
		element: {size: 'md', content: 'card', side: 'card', main: 'text'},
	},
}
