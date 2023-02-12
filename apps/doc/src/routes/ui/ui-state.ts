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
	enter(styles: StyleTree) {
		console.log('ui-state/enter - ApiValues')
		for (const value of styles.values()) {
			console.log(value)
		}
		this.styles = styles
		return true
	}

	getStyleTree(category: string) {
		return this.styles[category]
	}

	getCategoryOptions(category: string) {
		return JSON.stringify(this.styles[category])
	}
	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.styles)
	}
}
