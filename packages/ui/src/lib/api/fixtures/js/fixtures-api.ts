import buttonFixtures from './blocks'
import graphicsFixtures from './graphics'
import layoutsFixtures from './layouts'
import compositionFixtures from './compositions'

export const COMPONENT_FIXTURES: any = {
	blocks: buttonFixtures,
	layouts: layoutsFixtures,
	graphics: graphicsFixtures,
	compositions: compositionFixtures,
}

export function getProps({category, component}: {category: string; component: string}) {
	return COMPONENT_FIXTURES[category][component]
}
