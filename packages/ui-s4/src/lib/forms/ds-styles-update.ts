import type {StyleTree} from '$lib/api/styles/types'

import constants from '$lib/types/constants'
import {initStyles} from '$lib/api/styles'

const {DEFAULT_REVEAL_STATE, DEFAULT_APP_SETTINGS, TRANSITION_REVEAL, NUMBER_TO_SIZE} = constants

export class DsStylesUpdate {
	api
	settings
	contextReveal
	/**
	 * Initialize default Styles object, then update styles from the user's cookie, if any
	 */
	constructor(styles: StyleTree | null = null) {
		this.api = initStyles()
		this.settings = DEFAULT_APP_SETTINGS
		this.contextReveal = DEFAULT_REVEAL_STATE
		if (styles) {
			this.api.applyStyles(styles)
		}
	}

	/**
	 * Update UI library styles based on inputs
	 */
	enter(data: FormData) {
		const styleValues = []

		for (const [key, value] of data) {
			if (key === 'reveal') {
				this.settings.reveal = TRANSITION_REVEAL[this.settings.reveal]
				return true
			}
			let [category, family, style, _] = key.split('.')
			let styleValue = {[style]: value.toString()}
			// FIXES: allows to enter range number values mapped to class names with no JS on client
			// TODO: figure out generic way to map range number values to string labels
			if (NUMBER_TO_SIZE[String(value)]) {
				styleValue = {[style]: NUMBER_TO_SIZE[String(value)]}
			}
			const familyValue = {[family]: styleValue}
			// TODO: Fix / understand:
			// - for some reason, the only way to get values out of FormData is to push them into an array
			// - if I set {name, value} properties in `this.styles`, all other properties except the last one updated become unset
			//    (i.e. once out of this loop, the only property of `this.styles` is the last one set in the loop)
			styleValues.push({id: key, value: {[category]: familyValue}})
		}

		const styles = this.api.getStyleTree()
		styleValues.forEach(({id, value}) => {
			const [category, family, style, _] = id.split('.')
			if (category !== 'submit' && category !== 'button') {
				styles[category][family][style] = value[category][family][style]
			}
			if (style === 'brightness' || style === 'contrast') {
				this.settings[style] = value[category][family][style]
			}
		})
		this.api.applyStyles(styles)
		return true
	}

	/**
	 * Serialize Styles so it can be set as a cookie
	 */
	toString() {
		const styleTree = this.api.getStyleTree()
		return JSON.stringify(styleTree)
	}
}
