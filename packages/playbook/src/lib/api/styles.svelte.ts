import type {
	Meta,
	StyleProps,
	AppStyles,
	TokenStyles,
	BlockStyles,
	LayoutStyles,
	StyleOptions,
	StyleTree,
	StyleCategory,
} from '$types'
import StyleInputGroup from './styles.input-group'
import StyleFamily from './styles.family'
import {getFamily} from '$lib/props/props-style'

const tokens: TokenStyles = {
	name: 'tokens',
	families: {token: getFamily('tokens.token')},
}

const app: AppStyles = {
	name: 'app',
	families: {settings: getFamily('app.settings')},
}

const blocks: BlockStyles = {
	name: 'blocks',
	families: {block: getFamily('blocks.block')},
}

const layouts: LayoutStyles = {
	name: 'layouts',
	families: {
		layout: getFamily('layouts.layout'),
		container: getFamily('layouts.container'),
		content: getFamily('layouts.content'),
	},
}
class StylesApi {
	app: AppStyles
	tokens: TokenStyles
	blocks: BlockStyles
	layouts: LayoutStyles

	constructor() {
		this.tokens = tokens
		this.app = app
		this.blocks = blocks
		this.layouts = layouts
	}

	getFormOptions(category: string, meta: Meta | undefined): StyleCategory[] {
		let options: StyleCategory[] | undefined
		if (meta?.props_style) {
			options = this.filterFormOptions(meta.props_style)
		} else if (category) {
			const categoryOptions = this.getCategoryOptions(category)
			options = categoryOptions ? [categoryOptions] : []
		}

		return options ? options : []
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
		const options: StyleCategory = {
			name: category,
			families: {},
		}

		let styleFamily: StyleFamily
		let filterItems: string[]
		famNames.forEach((familyName) => {
			filterItems = families[familyName]
			styleFamily = getFamily(`${category}.${familyName}`)
			styleFamily.items = this.filterInputGroups(styleFamily, filterItems)

			options.families[familyName] = styleFamily
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
				return category.families.settings
			case 'block':
				return category.families.block
			case 'layout':
				return category.families.layout
			case 'container':
				return category.families.container
			case 'content':
				return category.families.content
			default:
				return undefined
		}
	}

	getCategoryOptions(category: string): StyleCategory | undefined {
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
				return undefined
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

	getValue(styles: StyleTree, id: string): string {
		let [category, family, style, _] = id.split('.')
		let result = ''
		if (
			styles[category] &&
			styles[category].families[family] &&
			styles[category].families[family][style]
		) {
			result = styles[category].families[family][style]
		}
		return result
	}

	getStyleTree(): StyleTree {
		let appFamilies = {families: {}}
		let tokensFamilies = {families: {}}
		let blocksFamilies = {families: {}}
		let layoutsLayoutFamilies = {families: {}}
		let layoutsContainerFamilies = {families: {}}

		if (this.app) {
			appFamilies = {...this.app.families.settings?.getStyleTree()}
		}
		if (this.tokens) {
			tokensFamilies = {...this.tokens.families.token?.getStyleTree()}
		}
		if (this.blocks) {
			blocksFamilies = {...this.blocks.families.block?.getStyleTree()}
		}
		if (this.layouts) {
			layoutsLayoutFamilies = {
				...this.layouts.families.layout?.getStyleTree(),
			}
		}
		if (this.layouts) {
			layoutsContainerFamilies = {
				...this.layouts.families.container?.getStyleTree(),
			}
		}

		return {
			tokens: tokensFamilies,
			app: appFamilies,
			blocks: blocksFamilies,
			layouts: {
				families: {
					...layoutsLayoutFamilies.families,
					...layoutsContainerFamilies.families,
				},
			},
		}
	}

	applyStyles(updatedStyles: StyleTree) {
		Object.keys(updatedStyles).map((updatedCategory) => {
			const category = updatedStyles[updatedCategory]
			const styles: StyleCategory = {name: updatedCategory, families: {}}

			switch (updatedCategory) {
				case 'tokens':
					styles.families = this.tokens.families || {
						block: getFamily('tokens.token'),
					}
					break
				case 'app':
					styles.families = this.app.families || {
						settings: getFamily('app.settings'),
					}
					break
				case 'blocks':
					styles.families = this.blocks.families || {
						block: getFamily('blocks.block'),
					}
					break
				case 'layouts':
					styles.families = this.layouts.families || {
						layout: getFamily('layouts.layout'),
						container: getFamily('layouts.container'),
						content: getFamily('layouts.content'),
					}
					break
				default:
					break
			}
			const families = Object.keys(styles.families)
			families.map((family) => {
				const updatedFamily = category.families
					? category.families[family]
					: undefined
				if (updatedFamily) {
					styles.families[family].applyStyles(updatedFamily)
				}
			})
		})
	}
}

export default StylesApi
