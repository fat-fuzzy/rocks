import type {StyleTree} from '$types'
import ui from '@fat-fuzzy/ui'
import buttonFixtures from '$lib/fixtures/js/blocks'
import tokenFixtures from '$lib/fixtures/js/tokens'
import layoutsFixtures from '$lib/fixtures/js/layouts'
import recipesFixtures from '$lib/fixtures/js/recipes'

const {DEFAULT_PREFERENCES, DEFAULT_STYLES} = ui.constants

// eslint-disable-next-line
const COMPONENT_FIXTURES: any = $state({
	tokens: tokenFixtures,
	blocks: buttonFixtures,
	layouts: layoutsFixtures,
	// graphics: graphicsFixtures,
	recipes: recipesFixtures,
})
export class PlaybookActor {
	api = $state()
	styles = $state<StyleTree>(DEFAULT_STYLES)
	preferences = $state(DEFAULT_PREFERENCES)

	constructor() {}

	getElementFixtures({
		category,
		component,
	}: {
		category: string
		component: string
	}) {
		if (COMPONENT_FIXTURES[category]) {
			return COMPONENT_FIXTURES[category][component]
		}
	}

	getLayoutFixtures(component: string) {
		return (
			COMPONENT_FIXTURES.layouts[component] ??
			COMPONENT_FIXTURES.layouts.content
		)
	}
}

const playbookActor = new PlaybookActor()
export default playbookActor
