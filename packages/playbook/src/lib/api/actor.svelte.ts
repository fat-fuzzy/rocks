import type {StyleTree} from '$types'
import ui from '@fat-fuzzy/ui'
import buttonFixtures from '$lib/fixtures/js/blocks'
import tokenFixtures from '$lib/fixtures/js/tokens'
import layoutsFixtures from '$lib/fixtures/js/layouts'
import recipesFixtures from '$lib/fixtures/js/recipes'

const {
	DEFAULT_REVEAL_STATE,
	DEFAULT_NAV_REVEAL_STATE,
	DEFAULT_APP_SETTINGS,
	DEFAULT_STYLES,
} = ui.constants

class PlaybookActor {
	api = $state()
	styles = $state<StyleTree>(DEFAULT_STYLES)
	app = $state({settings: DEFAULT_APP_SETTINGS})
	Reveal = $state(DEFAULT_REVEAL_STATE)
	RevealMenu = $state(DEFAULT_REVEAL_STATE)
	RevealNav = $state(DEFAULT_REVEAL_STATE)
	HeaderRevealNav = $state(DEFAULT_REVEAL_STATE)
	HeaderRevealSettings = $state(DEFAULT_NAV_REVEAL_STATE)

	COMPONENT_FIXTURES: any = $state({
		tokens: tokenFixtures,
		blocks: buttonFixtures,
		layouts: layoutsFixtures,
		// graphics: graphicsFixtures,
		recipes: recipesFixtures,
	})

	COMPONENT_STATE: any = $state({
		Reveal: this.Reveal,
		RevealMenu: this.RevealMenu,
		RevealNav: this.RevealNav,
		HeaderRevealNav: this.HeaderRevealNav,
		// graphics: graphicsFixtures,
		HeaderRevealSettings: this.HeaderRevealSettings,
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

	getLayoutFixtures(component: string) {
		return (
			this.COMPONENT_FIXTURES.layouts[component] ??
			this.COMPONENT_FIXTURES.layouts.content
		)
	}

	getRevealState(component: string) {
		switch (component) {
			case 'Reveal':
			case 'RevealMenu':
			case 'RevealNav':
				return this.COMPONENT_STATE[component]
			case 'Header-nav-reveal':
				return this.COMPONENT_STATE['HeaderRevealNav']
			case 'Header-settings-reveal':
				return this.COMPONENT_STATE['HeaderRevealSettings']
		}
	}
}

export default PlaybookActor
