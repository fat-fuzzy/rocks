import ui from '@fat-fuzzy/ui'

const {DEFAULT_REVEAL_STATE, DEFAULT_STYLES, DEFAULT_PREFERENCES} = ui.constants

// TODO - Get type from @fat-fuzzy/ui
type CookiePreferences = {
	functional?: boolean
	analytics?: boolean
}

type Settings = {
	reveal: string
	brightness: string
	contrast: string
	consent: CookiePreferences
}

class AppContext {
	styles = $state(DEFAULT_STYLES)
	app: Settings = $state({
		...DEFAULT_PREFERENCES,
		...DEFAULT_REVEAL_STATE,
	})

	constructor(settings?: Settings) {
		if (settings) {
			this.app = settings
		}
	}

	updateBrightness = (brightness: string) => {
		this.app = {...this.app, brightness}
	}

	updateContrast = (contrast: string) => {
		this.app = {...this.app, contrast}
	}
}

export default AppContext
