import buttonFixtures from './blocks'
import tokenFixtures from './tokens'
import graphicsFixtures from './graphics'
import layoutsFixtures from './layouts'
import recipesFixtures from './recipes'

export const COMPONENT_FIXTURES: any = {
	tokens: tokenFixtures,
	blocks: buttonFixtures,
	layouts: layoutsFixtures,
	graphics: graphicsFixtures,
	recipes: recipesFixtures,
}

export function getFixtures({category, component}: {category: string; component: string}) {
	if (COMPONENT_FIXTURES[category]) {
		return COMPONENT_FIXTURES[category][component]
	}
}
