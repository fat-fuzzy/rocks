import {api} from '@fat-fuzzy/ui'

export class UiState {
	api
	numberToClass: {[key: string]: string} = {
		// TODO: figure out a better way to map range number values to class strings
		'0': 'xs',
		'25': 'sm',
		'50': 'md',
		'75': 'lg',
		'100': 'xl',
	}
	/**
	 * Create a UI state object from the user's cookie, or initialize a new UI state
	 */
	constructor(styles = undefined) {
		this.api = api.stylesApi.initStyles()
		if (styles) {
			this.api.applyStyles(styles)
		}
	}

	/**
	 * Update UI library state based on inputs
	 */
	enter(data: FormData) {
		const styleValues = []

		// TODO: see how I can improve this

		for (const pair of data.entries()) {
			let [category, family, style, _] = pair[0].split('.')
			let styleValue = {[style]: pair[1].toString()}

			// FIXES: allows to enter range number values mapped to class names with no JS on client
			// TODO: figure out generic way to map range number values to string labels
			if (this.numberToClass[String(pair[1])]) {
				styleValue = {[style]: this.numberToClass[String(pair[1])]}
			}
			const familyValue = {[family]: styleValue}
			// TODO: Fix / understand:
			// - for some reason, the only way to get values out of FormData is to push them into an array
			// - if I set {name, value} properties in `this.styles`, all other properties except the last one updated become unset
			//    (i.e. once out of this loop, the only property of `this.styles` is the last one set in the loop)
			styleValues.push({id: pair[0], value: {[category]: familyValue}})
		}

		const styles = this.api.getStyleTree()
		styleValues.forEach(({id, value}) => {
			const [category, family, style, _] = id.split('.')
			if (category !== 'submit' && category !== 'button') {
				styles[category][family][style] = value[category][family][style]
			}
		})
		this.api.applyStyles(styles)
		return true
	}

	/**
	 * Serialize UI state so it can be set as a cookie
	 */
	toString() {
		const styleTree = this.api.getStyleTree()
		return JSON.stringify(styleTree)
	}
}
