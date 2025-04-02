import ui from '@fat-fuzzy/ui'
import type {
	CookiePreferences,
	UiState,
} from '../../../../../../packages/ui/dist/types' // TODO - Get type from @fat-fuzzy/ui

const {DEFAULT_REVEAL_STATE, DEFAULT_STYLES, DEFAULT_PREFERENCES} = ui.constants

// TODO - Get type from @fat-fuzzy/ui
type Settings = {
	reveal: UiState
	brightness: string
	contrast: string
	cookies: CookiePreferences
}

class AppContext {
	styles = $state(DEFAULT_STYLES)
	app = $state({
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
