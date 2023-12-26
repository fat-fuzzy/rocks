import type {
	AppStyles,
	TokenStyles,
	BlockStyles,
	LayoutStyles,
	StyleOptions,
	StyleTree,
	StyleCategory,
} from './types'
import {getFamily} from '$lib/api/props/props-style'

export class StylesApi {
	app: AppStyles
	tokens: TokenStyles
	blocks: BlockStyles
	layouts: LayoutStyles

	constructor({tokens, app, blocks, layouts}: StyleOptions) {
		this.tokens = tokens
		this.app = app
		this.blocks = blocks
		this.layouts = layouts
	}

	getFormOptions(category: string): StyleCategory {
		return this.getCategoryOptions(category)
	}

	getElementFormOptions(category: string, styleProps): StyleCategory {
		return this.getCategoryOptions(category)
	}

	getCategoryOptions(category: string): StyleCategory {
		switch (category) {
			case 'tokens':
				return this.tokens
			case 'app':
				return this.app
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
			blocks: this.blocks,
			layouts: this.layouts,
		}
	}

	getStyleTree(): StyleTree {
		const appStylesTree = this.app?.settings?.getStyleTree() || {}
		const tokensStylesTree = this.tokens?.element?.getStyleTree() || {}
		const blocksStylesTree = this.blocks?.element?.getStyleTree() || {}
		const layoutsLayoutStylesTree = this.layouts?.layout?.getStyleTree() || {}
		const layoutsContainerStylesTree = this.layouts?.container?.getStyleTree() || {}

		return {
			tokens: tokensStylesTree,
			app: appStylesTree,
			blocks: blocksStylesTree,
			layouts: {
				...layoutsLayoutStylesTree,
				...layoutsContainerStylesTree,
			},
		}
	}

	applyStyles(updatedStyles: StyleTree) {
		console.log('applyStyles - updatedStyles')
		console.log(updatedStyles)

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
				case 'blocks':
					families = Object.keys(this.blocks)
					styles = this.blocks
					break
				case 'layouts':
					families = Object.keys(this.layouts)
					styles = this.layouts
					break
				default:
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

const blocks: BlockStyles = {
	element: getFamily('Element', 'blocks', [
		'Color',
		'Variant',
		'Size',
		'Status',
		'Context',
		'Asset',
		'Shape',
	]),
}

const layouts: LayoutStyles = {
	layout: getFamily('Layout', 'layouts', ['Layout', 'Threshold', 'Breakpoint']),
	container: getFamily('Container', 'layouts', ['Container', 'Size']),
}

export const initStyles = () => new StylesApi({app, tokens, blocks, layouts})
