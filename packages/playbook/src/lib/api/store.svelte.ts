import {constants} from '@fat-fuzzy/ui-s5'
import buttonFixtures from '$lib/fixtures/js/blocks'
import tokenFixtures from '$lib/fixtures/js/tokens'
import layoutsFixtures from '$lib/fixtures/js/layouts'
import recipesFixtures from '$lib/fixtures/js/recipes'

const {
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_STYLES,
	DEFAULT_TABS,
} = constants
class PlaybookStore {
	api = $state()
	styles = $state(DEFAULT_STYLES)
	reveal = $state(DEFAULT_REVEAL_STATE)
	app = $state({settings: DEFAULT_APP_SETTINGS})
	menuReveal = $state(DEFAULT_REVEAL_STATE)
	navReveal = $state(DEFAULT_REVEAL_STATE)
	sidebarReveal = $state(DEFAULT_NAV_REVEAL_STATE)
	settingsReveal = $state(DEFAULT_REVEAL_STATE)
	currentTabs = $state({ui: DEFAULT_TABS[0]})

	COMPONENT_FIXTURES: any = $state({
		tokens: tokenFixtures,
		blocks: buttonFixtures,
		layouts: layoutsFixtures,
		// graphics: graphicsFixtures,
		recipes: recipesFixtures,
	})

	constructor() {}

	getElementFixtures({
		category,
		component,
	}: {
		category: string
		component: string
	}) {
		if (this.COMPONENT_FIXTURES[category]) {
			return this.COMPONENT_FIXTURES[category][component]
		}
	}

	getLayoutFixtures() {
		return this.COMPONENT_FIXTURES.layouts
	}
}

const store = new PlaybookStore()
export default store
