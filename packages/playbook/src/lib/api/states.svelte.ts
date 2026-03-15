import type {
	Meta,
	PlaybookInputProps,
	AppState,
	StyleOptions,
	StyleTree,
	InputCategory,
} from '$types'
import IPlaybookInputGroup from './state.input-group'
import IPlaybookFamily from './states.family'
import {getFamily} from '$lib/props/props-style'

const app: AppState = {
	name: 'app',
	families: {config: getFamily('app.config')},
}

class StatesApi {
	app: AppState

	constructor() {
		this.app = app
	}

	getFormOptions(category: string, meta: Meta | undefined): InputCategory[] {
		let options: InputCategory[] | undefined
		if (meta?.props_state) {
			options = this.filterFormOptions(meta.props_state)
		} else if (category) {
			const categoryOptions = this.getCategoryOptions(category)
			options = categoryOptions ? [categoryOptions] : []
		}

		return options ? options : []
	}

	filterFormOptions(styleProps: PlaybookInputProps): InputCategory[] {
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
	): InputCategory {
		const famNames = Object.keys(families)
		const options: InputCategory = {
			name: category,
			families: {},
		}

		let family: IPlaybookFamily
		let filterItems: string[]
		famNames.forEach((familyName) => {
			filterItems = families[familyName]
			family = getFamily(`${category}.${familyName}`)
			family.items = this.filterInputGroups(family, filterItems)

			options.families[familyName] = family
		})

		return options
	}

	filterInputGroups(
		familyOptions: IPlaybookFamily,
		filterItems: string[],
	): IPlaybookInputGroup[] {
		const options: IPlaybookInputGroup[] = filterItems.reduce(
			(inputs: IPlaybookInputGroup[], input) => {
				const familyInput: IPlaybookInputGroup | undefined =
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
		category: InputCategory,
	): IPlaybookFamily | undefined {
		switch (family) {
			case 'config':
				return category.families.config
			default:
				return undefined
		}
	}

	getCategoryOptions(category: string): InputCategory | undefined {
		switch (category) {
			case 'app':
				return this.app
			default:
				return undefined
		}
	}

	geAllOptions(): StyleOptions {
		return {
			app: this.app,
		}
	}

	getValue(styles: StyleTree, id: string): string {
		// eslint-disable-next-line
		const [category, family, style, _] = id.split('.')
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
}

export default StatesApi
