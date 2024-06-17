import {constants} from '@fat-fuzzy/ui-s5'

const {
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_STYLES,
	DEFAULT_TABS,
} = constants

class FatFuzzyStore {
	styles = $state(DEFAULT_STYLES)
	reveal = $state(DEFAULT_REVEAL_STATE)
	app = $state(DEFAULT_APP_SETTINGS)
	menuReveal = $state(DEFAULT_REVEAL_STATE)
	navReveal = $state(DEFAULT_REVEAL_STATE)
	sidebarReveal = $state(DEFAULT_NAV_REVEAL_STATE)
	settingsReveal = $state(DEFAULT_REVEAL_STATE)
	currentTabs = $state({ui: DEFAULT_TABS[0]})

	constructor() {}
	// TODO: init and update functions
}

const store = new FatFuzzyStore()
export default store
