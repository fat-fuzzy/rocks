import ui from '@fat-fuzzy/ui'

const {DEFAULT_APP_SETTINGS, DEFAULT_STYLES} = ui.constants

// TODO - Get type from @fat-fuzzy/ui
type Settings = {[key: string]: string}
class FatFuzzyStore {
	styles = $state(DEFAULT_STYLES)
	app: {settings: Settings} = $state({
		settings: DEFAULT_APP_SETTINGS,
	})

	constructor(settings?: Settings) {
		if (settings) {
			this.app.settings = settings
		}
	}

	updateBrightness = (brightness: string) => {
		this.app.settings = {...this.app.settings, brightness}
	}

	updateContrast = (contrast: string) => {
		this.app.settings = {...this.app.settings, contrast}
	}
}

export default FatFuzzyStore
