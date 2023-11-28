import type {Settings} from '$types/constants'
import {DEFAULT_APP_SETTINGS} from '$types/constants'

const BRIGHTNESS_TRANSITION: {[key: string]: string} = {
	day: 'night',
	night: 'day',
}
const CONTRAST_TRANSITION: {[key: string]: string} = {
	contrast: 'blend',
	blend: 'contrast',
}

export class SettingsUpdate {
	app: Settings
	/**
	 * Initialize default Settings object or from the user's cookie values, if any
	 */
	constructor(settings: Settings | null = null) {
		if (settings) {
			this.app = settings
		} else {
			this.app = DEFAULT_APP_SETTINGS
		}
	}

	/**
	 * Update Settings based on inputs
	 */
	update(data: FormData) {
		try {
			let updated = data.get('brightness')?.toString()
			if (updated) {
				this.app.brightness = BRIGHTNESS_TRANSITION[this.app.brightness]
			}
			updated = data.get('contrast')?.toString()
			if (updated) {
				this.app.contrast = CONTRAST_TRANSITION[this.app.contrast]
			}
			return true
		} catch (e) {
			return false
		}
	}

	/**
	 * Serialize Settings so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify({brightness: this.app.brightness, contrast: this.app.contrast})
	}
}
