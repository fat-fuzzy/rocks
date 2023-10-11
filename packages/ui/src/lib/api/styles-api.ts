import type {
	AppStyles,
	SharedStyles,
	BlockStyles,
	LayoutStyles,
	StyleOptions,
	StyleTree,
	StyleCategory,
} from './types'
import {StyleInput, StyleFamily} from './types'

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

	getCategoryOptions(category: string) {
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
				return this.app
		}
	}

	geAllOptions() {
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
		id: 'app.settings',
		layout: 'switcher',
		container: 'burrito',
		size: 'sm',
		items: [
			new StyleInput({
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
			new StyleInput({
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
		layout: 'switcher',
		container: 'burrito',
		size: 'md',
		id: 'shared.context',
		exclude: [/* 'layouts', */ 'Button', 'Toggle', 'Stack', 'Burrito', 'Sidebar'],
		items: [
			new StyleInput({
				name: 'Size', // TODO: use 'spacing' instead of 'size' in data
				id: 'shared.context.size',
				value: 'md',
				input: 'toggle',
				layout: 'stack',
				exclude: [/* 'layouts', */ 'Switcher'],
				items: [
					{id: 'shared.context.size.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'shared.context.size.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'shared.context.size.md', text: 'md', asset: '', value: 'md'},
					{id: 'shared.context.size.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'shared.context.size.xl', text: 'xl', asset: '', value: 'xl'},
				],
			}),
			new StyleInput({
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
			new StyleInput({
				name: 'Layout',
				id: 'shared.context.layout',
				value: 'switcher',
				input: 'toggle',
				layout: 'stack',
				exclude: [/* 'layouts', */ 'Switcher'],
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
			new StyleInput({
				name: 'Breakpoint',
				id: 'shared.context.breakpoint',
				value: 'md',
				input: 'toggle',
				layout: 'stack',
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
		id: 'blocks.element',
		layout: 'switcher',
		container: 'burrito',
		size: 'xs',
		items: [
			new StyleInput({
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
			new StyleInput({
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
			new StyleInput({
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
			new StyleInput({
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
		id: 'layouts.element',
		container: 'burrito',
		size: 'sm',
		layout: 'switcher',
		items: [
			new StyleInput({
				name: 'Size', // TODO: use 'spacing' instead of 'size' in data
				id: 'layouts.element.size',
				value: 'md',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'layouts.element.size.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'layouts.element.size.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'layouts.element.size.md', text: 'md', asset: '', value: 'md'},
					{id: 'layouts.element.size.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'layouts.element.size.xl', text: 'xl', asset: '', value: 'xl'},
				],
			}),
			new StyleInput({
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
			new StyleInput({
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
			new StyleInput({
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
		],
	}),
}

export const initStyles = () => new StylesApi({app, shared, blocks, layouts})

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
