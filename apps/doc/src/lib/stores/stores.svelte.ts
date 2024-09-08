import ui from '@fat-fuzzy/ui'

const {
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_STYLES,
	DEFAULT_TABS,
} = ui.constants

// TODO - Get type from @fat-fuzzy/ui
type Settings = {[key: string]: string}
class FatFuzzyStore {
	styles = $state(DEFAULT_STYLES)
	reveal: Settings = $state(DEFAULT_REVEAL_STATE)
	app: {settings: Settings} = $state({
		settings: DEFAULT_APP_SETTINGS,
	})
	menuReveal: Settings = $state(DEFAULT_REVEAL_STATE)
	navReveal: Settings = $state(DEFAULT_REVEAL_STATE)
	sidebarReveal: Settings = $state(DEFAULT_NAV_REVEAL_STATE)
	settingsReveal: Settings = $state(DEFAULT_REVEAL_STATE)
	currentTabs: {ui: Settings} = $state({ui: DEFAULT_TABS[0]})

	constructor() {}
	// TODO: init and update functions
}

const store = new FatFuzzyStore()
export default store
