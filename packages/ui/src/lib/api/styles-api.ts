import type {ComponentType} from 'svelte'
export type ComponentChild = string | ComponentType | (string | ComponentType)[] // TODO: figure out if I really need this

// TODO: figure out if I can extract this info from Svelte component
export interface StyleInputProps {
	id: string
	asset?: string
	size?: string
	label?: string
	text?: string
	value: string
	brightness?: string
	contrast?: string
	app?: string
	container?: string
	content?: string
	breakpoint?: string
	variant?: string
	color?: string
	layout?: string
	// options?: StyleOption
}

export type StylesFormValue = {[style: string]: string}

export type StylesApiInput = {
	[category: string]: {[family: string]: StylesFormValue}
}

export type StyleNode = {
	[style: string]: string
}
export type StyleBranch = {
	[family: string]: StyleNode
}
export type StyleTree = {
	[category: string]: StyleBranch
}

type StyleTreeFlat = {
	category: string
	family: string
	style: string
	value: string | string[]
}

interface StyleInputOptions {
	id: string
	name: string
	input: string
	items: Array<StyleInputProps>
	value: string
	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components
}
class StyleInput {
	id: string
	name: string
	slug: string
	input: string
	items: Array<StyleInputProps>
	value: string
	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components

	constructor({id, name, input, items, value, layout, exclude, include}: StyleInputOptions) {
		this.id = id
		this.name = name
		this.slug = name.toLowerCase()
		this.items = items
		this.input = input
		this.value = value ?? ''
		if (layout) {
			this.layout = layout
		}
		if (exclude) {
			this.exclude = exclude
		}
		if (include) {
			this.include = include
		}
	}

	getValue(): string | undefined {
		return this.value
	}

	setValue(value: string) {
		this.value = value
	}

	getStyleTree(): StyleNode {
		const [category, family, style] = this.id.split('.')
		return {[style]: this.value}
	}

	getStyleTreeFlat(): StyleTreeFlat {
		const [category, family, style] = this.id.split('.')
		return {category, family, style, value: this.value}
	}

	includes(item: string): boolean {
		return this.include ? this.include.indexOf(item) !== -1 : true
	}

	excludes(item: string): boolean {
		return this.exclude ? this.exclude.indexOf(item) !== -1 : false
	}
}

interface StyleFamilyOptions {
	id: string
	name: string
	items: StyleInput[]
	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components only
}
class StyleFamily {
	/**
	 * StyleFamilys provide form inputs for related styles that apply to a single StyleCategory
	 * A StyleCategory
	 */
	id: string
	name: string
	items: StyleInput[]
	itemsMap: Map<string, StyleInput>
	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components only

	constructor({id, name, items, layout, exclude, include}: StyleFamilyOptions) {
		this.id = id
		this.name = name
		this.items = items

		const itemsMap = new Map()
		items.forEach((item) => {
			itemsMap.set(item.slug, item)
		})
		this.itemsMap = itemsMap

		if (layout) {
			this.layout = layout
		}
		if (exclude) {
			this.exclude = exclude
		}
		if (include) {
			this.include = include
		}
	}

	getStyleTree(): StyleBranch {
		const [category, family] = this.id.split('.')
		const children = this.items.reduce((childrenTrees, style) => {
			return {...childrenTrees, ...style.getStyleTree()}
		}, {})
		return {[family]: {...children}}
	}

	getStyleTreeFlat(): StyleTreeFlat {
		const [category, family, style] = this.id.split('.')
		return {category, family, style, value: this.items.map((item) => item.id)}
	}

	includes(item: string): boolean {
		return this.include ? this.include.indexOf(item) !== -1 : true
	}

	excludes(item: string): boolean {
		return this.exclude ? this.exclude.indexOf(item) !== -1 : false
	}

	applyStyles(styles: StylesFormValue) {
		Object.keys(styles).forEach((key) => {
			const item = this.itemsMap.get(key)
			if (item) {
				item.setValue(styles[key])
				this.itemsMap.set(key, item)
			}
		})
		this.items = Array.from(this.itemsMap.values())
	}
}

interface StyleCategory {
	[key: string]: StyleFamily
}

interface AppStyles extends StyleCategory {
	// theme: StyleFamily  // TODO : figure out if it is possible to do a dynamic import of app theme
	settings: StyleFamily
}
interface SharedStyles extends StyleCategory {
	context: StyleFamily
}
interface BlockStyles extends StyleCategory {
	element: StyleFamily
}
interface LayoutStyles extends StyleCategory {
	children: StyleFamily
}

interface StylesApiOptions {
	app: AppStyles
	shared: SharedStyles
	blocks: BlockStyles
	layouts: LayoutStyles
}
export class StylesApi {
	app: AppStyles
	shared: SharedStyles
	blocks: BlockStyles
	layouts: LayoutStyles

	constructor({app, shared, blocks, layouts}: StylesApiOptions) {
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
		const layoutsStylesTree = this.layouts?.children?.getStyleTree() || {}

		return {
			app: appStylesTree,
			shared: sharedStylesTree,
			blocks: blocksStylesTree,
			layouts: layoutsStylesTree,
		}
	}

	applyStyles(updatedStyles: StylesApiInput) {
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
		id: 'shared.context',
		exclude: ['Button', 'Toggle'],
		items: [
			new StyleInput({
				name: 'Container',
				id: 'shared.context.container',
				value: '',
				input: 'toggle',
				layout: 'stack',
				exclude: [/* 'layouts', */ 'Button', 'Toggle', 'Stack', 'Burrito', 'Sidebar'],
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
				exclude: ['layouts', 'Button', 'Toggle'],
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
						// 		layout: 'stack',
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
				name: 'Size',
				id: 'shared.context.size',
				value: 'md',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'shared.context.size.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'shared.context.size.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'shared.context.size.md', text: 'md', asset: '', value: 'md'},
					{id: 'shared.context.size.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'shared.context.size.xl', text: 'xl', asset: '', value: 'xl'},
				],
			}),
			new StyleInput({
				name: 'Breakpoint',
				id: 'shared.context.breakpoint',
				value: 'md',
				input: 'toggle',
				layout: 'stack',
				exclude: ['Button', 'Toggle', 'Nav', 'Stack', 'Burrito'],
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
				layout: 'switcher',
				items: [
					{id: 'blocks.element.size.xs', text: 'xs', asset: '', value: 'xs'},
					{id: 'blocks.element.size.sm', text: 'sm', asset: '', value: 'sm'},
					{id: 'blocks.element.size.md', text: 'md', asset: '', value: 'md'},
					{id: 'blocks.element.size.lg', text: 'lg', asset: '', value: 'lg'},
					{id: 'blocks.element.size.xl', text: 'xl', asset: '', value: 'xl'},
				],
			}),
			new StyleInput({
				name: 'Emoji',
				id: 'blocks.element.emoji',
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
					{id: 'blocks.element.emoji.cat', text: 'cat', asset: '🦁', value: 'cat'},
					{id: 'blocks.element.emoji.love', text: 'love', asset: '❤️', value: 'love'},
					{id: 'blocks.element.emoji.sparkles', text: 'sparkles', asset: '✨', value: 'sparkles'},
				],
			}),
		],
	}),
}

const layouts: LayoutStyles = {
	children: new StyleFamily({
		name: 'Children',
		id: 'layouts.children',
		layout: 'switcher',
		items: [
			new StyleInput({
				name: 'Content',
				id: 'layouts.children.content',
				value: 'card',
				input: 'toggle',
				layout: 'stack',
				exclude: ['Sidebar'],
				items: [
					{id: 'layouts.children.content.card', text: 'card', asset: '', value: 'card'},
					{id: 'layouts.children.content.form', text: 'form', asset: '', value: 'form'},
					{id: 'layouts.children.content.text', text: 'text', asset: '', value: 'text'},
				],
			}),
			new StyleInput({
				name: 'Side',
				id: 'layouts.children.side',
				value: 'card',
				input: 'toggle',
				layout: 'stack',
				include: ['Sidebar'],
				items: [
					{id: 'layouts.children.side.card', text: 'card', asset: '', value: 'card'},
					{id: 'layouts.children.side.form', text: 'form', asset: '', value: 'form'},
					{id: 'layouts.children.side.text', text: 'text', asset: '', value: 'text'},
				],
			}),
			new StyleInput({
				name: 'Main',
				id: 'layouts.children.main',
				value: 'text',
				input: 'toggle',
				layout: 'stack',
				include: ['Sidebar'],
				items: [
					{id: 'layouts.children.main.card', text: 'card', asset: '', value: 'card'},
					{id: 'layouts.children.main.form', text: 'form', asset: '', value: 'form'},
					{id: 'layouts.children.main.text', text: 'text', asset: '', value: 'text'},
				],
			}),
		],
	}),
}

export const getDefaultOptions = () => new StylesApi({app, shared, blocks, layouts})

export const DEFAULT_STYLES: StyleTree = {
	app: {
		settings: {
			brightness: 'day',
			contrast: 'blend',
		} /* theme: {theme: 'ui'} // TODO : figure out if it is possible to do a dynamic import of app theme */,
	},
	shared: {
		context: {layout: 'switcher', container: 'center', size: 'md', breakpoint: ''},
	},
	blocks: {
		element: {
			variant: '',
			color: '',
			// theme: {theme: 'ui'}, // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component content): maybe: use web components ?
			emoji: '✨',
			size: 'md',
		},
	},
	layouts: {
		children: {content: 'card', side: 'card', main: 'text'},
	},
}
