import ui from '@fat-fuzzy/ui'
import type {StyleTree} from '$types'
import StylesApi from '$lib/api/styles.svelte'

const {DEFAULT_PREFERENCES, NUMBER_TO_SIZE} = ui.constants

class DsStylesUpdate {
	api
	settings
	/**
	 * Initialize default Styles object, then update styles from the user's cookie, if any
	 */
	constructor(styles: StyleTree | null = null) {
		this.api = new StylesApi()
		this.settings = DEFAULT_PREFERENCES
		if (styles) {
			this.api.applyStyles(styles)
		}
	}

	/**
	 * Update UI library styles based on inputs
	 */
	enter(data: FormData) {
		if (
			data.has('ui-Header-menu-settings-menu-brightness') ||
			data.has('ui-Header-menu-settings-menu-contrast')
		) {
			// TODO: fix this not doing anything
			// return this.appContextUpdate(data)
		}

		const styleValues = []
		let category
		let family
		let style
		let _

		for (const [key, value] of data) {
			;[category, family, style, _] = key.split('.')
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
			;[category, family, style, _] = id.split('.')
			if (!styles[category]) {
				styles[category] = {families: {}}
			}
			if (category !== 'submit' && category !== 'button') {
				styles[category].families[family][style] =
					value[category][family][style]
			}
			if (style === 'brightness' || style === 'contrast') {
				this.settings[style] = value[category][family][style]
			}
		})

		this.api.applyStyles(styles)
		return true
	}

	appContextUpdate(data: FormData) {
		let updated = data
			.get('ui-Header-menu-settings-menu-brightness')
			?.toString()

		if (updated) {
			this.settings.brightness = updated
			return true
		}

		updated = data.get('ui-Header-menu-settings-menu-contrast')?.toString()

		if (updated) {
			this.settings.contrast = updated
			return true
		}
		return false
	}

	/**
	 * Serialize Styles so it can be set as a cookie
	 */
	toString() {
		const styleTree = this.api.getStyleTree()
		return JSON.stringify(styleTree)
	}
}

export default DsStylesUpdate
