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
import {
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
} from './props/props_style'

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
		items: [],
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
				items: brightness.map((item) => {
					return {...item, id: `app.settings.${item.id}`}
				}),
			}),
			new StyleInputGroup({
				name: 'Contrast',
				id: 'app.settings.contrast',
				value: 'blend',
				input: 'radio',
				layout: 'stack',
				size: 'sm',
				variant: 'box card',
				items: contrast.map((item) => {
					return {...item, id: `app.settings.${item.id}`}
				}),
			}),
		],
	}),
}

const shared: SharedStyles = {
	container: new StyleFamily({
		name: 'Container',
		title: '',
		layout: 'flex grow',
		size: 'lg',
		variant: 'card',
		id: 'shared.container',
		exclude: [
			'Color',
			'Typography',
			'ActionLabel',
			'Button',
			'Expand',
			'Switch',
			'Toggle',
			'RevealAuto',
		],
		items: [
			new StyleInputGroup({
				name: 'Container',
				id: 'shared.container.container',
				value: 'center',
				input: 'toggle',
				layout: 'stack',
				size: 'sm',
				container: 'card',
				exclude: ['Stack', 'Burrito'],
				items: container.map((item) => {
					return {...item, id: `shared.container.${item.id}`}
				}),
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
				items: size.map((item) => {
					return {...item, id: `shared.container.${item.id}`}
				}),
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
		exclude: [
			'Color',
			'Typography',
			'ActionLabel',
			'Button',
			'Expand',
			'Switch',
			'Toggle',
			'Feedback',
			'RevealAuto',
		],
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
				items: layout.map((item) => {
					return {...item, id: `shared.layout.${item.id}`}
				}),
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
				items: threshold.map((item) => {
					return {...item, id: `shared.layout.${item.id}`}
				}),
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
				items: breakpoint.map((item) => {
					return {...item, id: `shared.layout.${item.id}`}
				}),
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
				items: color.map((item) => {
					return {...item, id: `blocks.element.${item.id}`}
				}),
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
				items: variant.map((item) => {
					return {...item, id: `blocks.element.${item.id}`}
				}),
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
				items: size.map((item) => {
					return {...item, id: `blocks.element.${item.id}`}
				}),
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
				items: status.map((item) => {
					return {...item, id: `blocks.element.${item.id}`}
				}),
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
					'Expand',
					'Switch',
					'Toggle',
					'InputCheck',
					'InputFile',
					'InputRadio',
					'InputRange',
				],
				include: ['Feedback'],
				items: context.map((item) => {
					return {...item, id: `blocks.element.${item.id}`}
				}),
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
				items: asset.emoji.map((item) => {
					return {...item, id: `blocks.element.${item.id}`}
				}),
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
				items: content.map((item) => {
					return {...item, id: `layouts.content.${item.id}`}
				}),
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
				items: side.map((item) => {
					return {...item, id: `layouts.content.${item.id}`}
				}),
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
				include: ['Sidebar', 'Switcher'],
				items: main.map((item) => {
					return {...item, id: `layouts.content.${item.id}`}
				}),
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
				items: size.map((item) => {
					return {...item, id: `layouts.element.${item.id}`}
				}),
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
				include: ['Switcher'],
				items: threshold.map((item) => {
					return {...item, id: `layouts.element.${item.id}`}
				}),
			}),
			new StyleInputGroup({
				name: 'Breakpoint',
				id: 'layouts.element.breakpoint',
				value: 'md',
				input: 'range',
				layout: 'stack',
				size: 'sm',
				variant: 'card',
				exclude: ['layouts'],
				include: ['RevealAuto'],
				items: breakpoint.map((item) => {
					return {...item, id: `layouts.element.${item.id}`}
				}),
			}),
		],
	}),
}

export const initStyles = () => new StylesApi({tokens, app, shared, blocks, layouts})
