import type {Meta} from '$lib/api/props/types'
import {
	type AppStyles,
	type TokenStyles,
	type BlockStyles,
	type LayoutStyles,
	type StyleOptions,
	type StyleTree,
	type StyleCategory,
	type StyleInputGroup,
	StyleFamily,
} from './types'
import {getFamily} from '$lib/api/props/props-style'
import format from '$lib/utils/format'

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
		if (meta && meta.props_style) {
			return this.getElementFormOptions(meta.props_style)
		}
		return [this.getCategoryOptions(category)]
	}

	getElementFormOptions(styleProps: {
		[key: string]: {
			[key: string]: string[]
		}
	}): StyleCategory[] {
		const catNames = Object.keys(styleProps)
		let families

		const options = catNames.map((category) => {
			families = styleProps[category]
			return this.getElementCategoryOptions(category, families)
		})

		return options
	}

	getElementCategoryOptions(
		category: string,
		families: {
			[key: string]: string[]
		},
	): StyleCategory {
		const famNames = Object.keys(families)
		const options: StyleCategory = {}

		famNames.forEach((familyName) => {
			const inputNames = families[familyName].map((inputName) => format.capitalize(inputName))
			options[familyName] = getFamily(format.capitalize(familyName), category, inputNames)
		})

		return options
	}

	getElementFamilyOptions(familyOptions: StyleFamily, inputGroups: string[]): StyleFamily {
		const options: StyleInputGroup[] = inputGroups.reduce((inputs: StyleInputGroup[], input) => {
			const familyInput: StyleInputGroup | undefined = familyOptions.itemsMap.get(input)

			if (familyInput !== undefined) {
				return [...inputs, familyInput]
			}

			return inputs
		}, [])

		return new StyleFamily({
			id: familyOptions.id,
			name: familyOptions.name,
			title: familyOptions.title,
			items: options,
			layout: familyOptions.layout,
			container: familyOptions.container,
			size: familyOptions.size,
			variant: familyOptions.variant,
		})
	}

	getFamilyOptions(family: string, category: StyleCategory): StyleFamily | undefined {
		switch (family) {
			case 'settings':
				return category.settings
			case 'element':
				return category.element
			case 'layout':
				return category.layout
			case 'container':
				return category.container
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
