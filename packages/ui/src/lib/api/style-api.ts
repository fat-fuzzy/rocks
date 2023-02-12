import type {ComponentType} from 'svelte'
export type ComponentChild = string | ComponentType | (string | ComponentType)[] // TODO: figure out if I really need this

// TODO: figure out if I can extract this info from Svelte component
export interface ComponentProps {
	id: string
	asset?: string
	size?: string
	label?: string
	text?: string
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
// export interface InputProps extends ComponentProps {
// 	label: string
// }
// export interface ButtonProps extends ComponentProps {
// 	text: string
// 	asset?: string
// }

type StyleTree = {
	[category: string]: {
		[family: string]: {
			[style: string]: string
		}
	}
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
	items: Array<ComponentProps>
	value: string
	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components
}
class StyleInput {
	id: string
	name: string
	input: string
	items: Array<ComponentProps>
	value: string
	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components

	constructor({id, name, input, items, value, layout, exclude, include}: StyleInputOptions) {
		this.id = id
		this.name = name
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

	getStyleTree(): StyleTree {
		const [category, family, style] = this.id.split('.')
		return {[category]: {[family]: {[style]: this.value}}}
	}

	getStyleTreeFlat(): StyleTreeFlat {
		const [category, family, style] = this.id.split('.')
		return {category, family, style, value: this.value}
	}

	getValue(): string | undefined {
		return this.value
	}

	setValue(value: string) {
		this.value = value
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
			itemsMap.set(item.name, item)
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

	getStyleTree(): StyleTree {
		const [category, family] = this.id.split('.')
		const children = this.items.reduce((childrenTrees, style) => {
			return {...childrenTrees, [style.name]: style.getStyleTree()}
		}, {})
		return {[category]: {[family]: {...children}}}
	}

	getStyleTreeFlat(): StyleTreeFlat {
		const [category, family, style] = this.id.split('.')
		return {category, family, style, value: this.items.map((item) => item.name)}
	}

	applyStyles(styles: {name: string; value: string}[]) {
		styles.forEach(({name, value}) => {
			const item = this.itemsMap.get(name)
			if (item) {
				item.setValue(value)
				this.itemsMap.set(name, item)
			}
		})
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
	content: StyleFamily
}

interface StylesApiOptions {
	app: AppStyles
	shared: SharedStyles
	blocks: BlockStyles
	layouts: LayoutStyles
}
class StylesApi {
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
		return {
			...this.app.settings.getStyleTree(),
			...this.shared.context.getStyleTree(),
			...this.blocks.element.getStyleTree(),
			...this.layouts.children.getStyleTree(),
		}
	}

	applyStyles(updatedStyles: {
		[category: string]: {[family: string]: {name: string; value: string}[]}
	}) {
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
				const updated = category[family]
				styles[family].applyStyles(updated)
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
				value: '',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'day', text: 'day', asset: '☀️'},
					{id: 'night', text: 'night', asset: '🌙'},
				],
			}),
			new StyleInput({
				name: 'Contrast',
				id: 'app.settings.contrast',
				value: '',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'contrast', text: 'contrast', asset: '🌗'}, // TODO : fix color vars & classes
					{id: 'blend', text: 'blend', asset: '🌑'}, // TODO: night / day asset option
					// {id: 'polar', label: 'polar'},
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
		items: [
			new StyleInput({
				name: 'Container',
				id: 'shared.context.container',
				value: '',
				input: 'toggle',
				layout: 'stack',
				exclude: [/* 'layouts', */ 'Button', 'Toggle', 'Stack', 'Burrito', 'Sidebar'],
				items: [
					{id: 'center', text: 'center', asset: ''},
					{id: 'burrito', text: 'burrito', asset: ''},
				],
			}),
			new StyleInput({
				name: 'Layout',
				id: 'shared.context.layout',
				value: '',
				input: 'toggle',
				layout: 'stack',
				exclude: ['layouts', 'Button', 'Toggle'],
				items: [
					{id: 'stack', text: 'stack', asset: ''},
					{
						id: 'switcher',
						text: 'switcher',
						asset: '',
						// options: [
						// 	//TODO: display breakpoint options conditionally
						// 	{
						// 		name: 'Breakpoint',
						// 		input: 'toggle',
						// 		layout: 'stack',
						// 		exclude: ['Button', 'Toggle', 'Nav', 'Stack', 'Burrito'],
						// 		items: [
						// 			{id: 'xs', text: 'xs', asset: ''},
						// 			{id: 'sm', text: 'sm', asset: ''},
						// 			{id: 'md', text: 'md', asset: ''},
						// 			{id: 'lg', text: 'lg', asset: ''},
						// 			{id: 'xl', text: 'xl', asset: ''},
						// 		],
						// 	},
						// ],
					},
				],
			}),
			new StyleInput({
				name: 'Size',
				id: 'shared.context.size',
				value: '',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'xs', text: 'xs', asset: ''},
					{id: 'sm', text: 'sm', asset: ''},
					{id: 'md', text: 'md', asset: ''},
					{id: 'lg', text: 'lg', asset: ''},
					{id: 'xl', text: 'xl', asset: ''},
				],
			}),
			new StyleInput({
				name: 'Breakpoint',
				id: 'shared.context.breakpoint',
				value: '',
				input: 'toggle',
				layout: 'stack',
				exclude: ['Button', 'Toggle', 'Nav', 'Stack', 'Burrito'],
				items: [
					{id: 'xs', text: 'xs', asset: ''},
					{id: 'sm', text: 'sm', asset: ''},
					{id: 'md', text: 'md', asset: ''},
					{id: 'lg', text: 'lg', asset: ''},
					{id: 'xl', text: 'xl', asset: ''},
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
				value: 'primary',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'primary', text: 'primary', variant: 'outline', color: 'primary', asset: ''},
					{id: 'accent', text: 'accent', variant: 'outline', color: 'accent', asset: ''},
					{id: 'highlight', text: 'highlight', variant: 'outline', color: 'highlight', asset: ''},
				],
			}),
			new StyleInput({
				name: 'Variant',
				id: 'blocks.element.variant',
				value: '',
				input: 'toggle',
				layout: 'stack',
				exclude: ['InputCheck', 'InputRadio', 'InputRange', 'InputFile'],
				items: [
					{id: '', text: 'default', asset: ''},
					{id: 'outline', text: 'outline', asset: ''},
					{id: 'bare', text: 'bare', asset: ''},
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
					{id: 'eye', text: 'eye', asset: '👁️'},
					{id: 'love', text: 'love', asset: '❤️'},
					{id: 'cat', text: 'cat', asset: '🦁'},
				],
			}),
			new StyleInput({
				name: 'Own Size',
				id: 'blocks.element.size',
				value: 'md',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'xs', text: 'xs', asset: ''},
					{id: 'sm', text: 'sm', asset: ''},
					{id: 'md', text: 'md', asset: ''},
					{id: 'lg', text: 'lg', asset: ''},
					{id: 'xl', text: 'xl', asset: ''},
				],
			}),
		],
	}),
}

const layouts: LayoutStyles = {
	content: new StyleFamily({
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
					{id: 'card', text: 'card', asset: ''},
					{id: 'form', text: 'form', asset: ''},
					{id: 'text', text: 'text', asset: ''},
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
					{id: 'card', text: 'card', asset: ''},
					{id: 'form', text: 'form', asset: ''},
					{id: 'text', text: 'text', asset: ''},
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
					{id: 'card', text: 'card', asset: ''},
					{id: 'form', text: 'form', asset: ''},
					{id: 'text', text: 'text', asset: ''},
				],
			}),
		],
	}),
}

export const API_OPTIONS = new StylesApi({app, shared, blocks, layouts})

export const DEFAULT_OPTIONS: StyleTree = {
	app: {
		settings: {
			brightness: 'day',
			contrast: 'low',
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
