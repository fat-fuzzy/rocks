import buttonFixtures from './blocks'
import graphicsFixtures from './graphics'
import layoutsFixtures from './layouts'

export const COMPONENT_FIXTURES: any = {
	blocks: buttonFixtures,
	layouts: layoutsFixtures,
	graphics: graphicsFixtures,
}

export function getProps({category, component}: {category: string; component: string}) {
	switch (category) {
		case 'blocks':
		case 'graphics':
			return COMPONENT_FIXTURES[category][component]
		case 'layouts':
			return COMPONENT_FIXTURES[category]
		default:
			return COMPONENT_FIXTURES['blocks'][component]
	}
}
