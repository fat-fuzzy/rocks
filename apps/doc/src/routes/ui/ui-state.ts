import type {StyleTree} from '@fat-fuzzy/ui'
import {api} from '@fat-fuzzy/ui'

export class UiState {
	styles: StyleTree
	/**
	 * Create a UI state object from the user's cookie, or initialize a new UI state
	 */
	constructor(serialized: string | undefined = undefined) {
		if (serialized) {
			const {app, shared, blocks, layouts} = JSON.parse(serialized)
			this.styles = {app, shared, blocks, layouts}
		} else {
			this.styles = api.stylesApi.DEFAULT_STYLES
		}
	}

	/**
	 * Update UI library state based on inputs
	 */
	enter(data: FormData) {
		const styleValues = []

		// TODO: see how I can improve this

		for (const pair of data.entries()) {
			const [category, family, style, _] = pair[0].split('.')
			const styleValue = {[style]: pair[1]}
			const familyValue = {[family]: styleValue}
			// TODO: Fix / understand:
			// - for some reason, the only way to get values out of FormData is to push them into an array
			// - if I set {name, value} properties in `this.styles`, all other properties except the last one updated become unset
			//    (i.e. once out of this loop, the only property of `this.styles` is the last one set in the loop)
			styleValues.push({id: pair[0], value: {[category]: familyValue}})
		}

		styleValues.forEach(({id, value}) => {
			const [category, family, style, _] = id.split('.')
			this.styles[category][family][style] = value[category][family][style]
		})
		return true
	}

	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.styles)
	}
}
