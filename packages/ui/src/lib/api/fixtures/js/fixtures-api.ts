import buttonFixtures from './blocks'
import tokenFixtures from './tokens'
import graphicsFixtures from './graphics'
import layoutsFixtures from './layouts'
import compositionFixtures from './compositions'

export const COMPONENT_FIXTURES: any = {
	tokens: tokenFixtures,
	blocks: buttonFixtures,
	layouts: layoutsFixtures,
	graphics: graphicsFixtures,
	compositions: compositionFixtures,
}

export function getProps({category, component}: {category: string; component: string}) {
	if (COMPONENT_FIXTURES[category]) {
		return COMPONENT_FIXTURES[category][component]
	}
}
