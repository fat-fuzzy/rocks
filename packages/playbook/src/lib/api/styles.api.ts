import type {Meta, StyleProps} from '$lib/props/types'
import type {
	AppStyles,
	TokenStyles,
	BlockStyles,
	LayoutStyles,
	StyleOptions,
	StyleTree,
	StyleCategory,
	StyleInputGroup,
	StyleFamily,
} from './styles.types'

import {getFamily} from '$lib/props/props-style'

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

	getFormOptions(category: string, meta: Meta | undefined): StyleCategory[] {
		if (category) {
			return [this.getCategoryOptions(category)]
		}
		if (meta?.props_style) {
			return this.filterFormOptions(meta.props_style)
		}
		return [this.getCategoryOptions('app')]
	}

	filterFormOptions(styleProps: StyleProps): StyleCategory[] {
		const catNames = Object.keys(styleProps)
		let families

		const options = catNames.map((category) => {
			families = styleProps[category]
			return this.filterCategoryOptions(category, families)
		})
		return options
	}

	filterCategoryOptions(
		category: string,
		families: {
			[key: string]: string[]
		},
	): StyleCategory {
		const famNames = Object.keys(families)
		const options: StyleCategory = {}

		let styleFamily: StyleFamily
		let filterItems: string[]
		famNames.forEach((familyName) => {
			filterItems = families[familyName]
			styleFamily = getFamily(`${category}.${familyName}`)
			styleFamily.items = this.filterInputGroups(styleFamily, filterItems)

			options[familyName] = styleFamily
		})

		return options
	}

	filterInputGroups(
		familyOptions: StyleFamily,
		filterItems: string[],
	): StyleInputGroup[] {
		const options: StyleInputGroup[] = filterItems.reduce(
			(inputs: StyleInputGroup[], input) => {
				const familyInput: StyleInputGroup | undefined =
					familyOptions.itemsMap.get(input)
				if (familyInput !== undefined) {
					return [...inputs, familyInput]
				}
				return inputs
			},
			[],
		)

		return options
	}

	getFamilyOptions(
		family: string,
		category: StyleCategory,
	): StyleFamily | undefined {
		switch (family) {
			case 'settings':
				return category.settings
			case 'element':
				return category.element
			case 'layout':
				return category.layout
			case 'container':
				return category.container
			case 'content':
				return category.content
			default:
				return undefined
		}
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
		const layoutsContainerStylesTree =
			this.layouts?.container?.getStyleTree() || {}

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
	element: getFamily('tokens.element'),
}

const app: AppStyles = {
	settings: getFamily('app.settings'),
}

const blocks: BlockStyles = {
	element: getFamily('blocks.element'),
}

const layouts: LayoutStyles = {
	layout: getFamily('layouts.layout'),
	container: getFamily('layouts.container'),
	content: getFamily('layouts.content'),
}

export const initStyles = () => new StylesApi({app, tokens, blocks, layouts})
