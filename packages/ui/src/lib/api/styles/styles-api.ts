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
import {getFamily} from './props/props_style'

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
	element: getFamily('Element', 'tokens', []),
}

const app: AppStyles = {
	settings: getFamily('Settings', 'app', ['Brightness', 'Contrast']),
}

const shared: SharedStyles = {
	container: getFamily('Container', 'shared', ['Container', 'Size']),
	layout: getFamily('Layout', 'shared', ['Layout', 'Threshold', 'Breakpoint']),
}

const blocks: BlockStyles = {
	element: getFamily('Element', 'blocks', [
		'Color',
		'Variant',
		'Size',
		'Status',
		'Context',
		'Emoji',
	]),
}

const layouts: LayoutStyles = {
	content: getFamily('Content', 'layouts', ['Content', 'Side', 'Main']),
	element: getFamily('Element', 'layouts', ['Size', 'Threshold', 'Breakpoint']),
}

export const initStyles = () => new StylesApi({tokens, app, shared, blocks, layouts})
