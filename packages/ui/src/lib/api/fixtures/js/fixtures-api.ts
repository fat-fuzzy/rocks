import buttonFixtures from './blocks'
import graphicsFixtures from './graphics'
import layoutsFixtures from './layouts'

export const COMPONENT_FIXTURES: any = {
	blocks: buttonFixtures,
	layouts: layoutsFixtures,
	graphics: graphicsFixtures,
}

export function getProps({category, component}: {category: string; component: string}) {
	let props = []
	switch (category) {
		case 'blocks':
		case 'graphics':
			props = COMPONENT_FIXTURES[category][component]
			break
		case 'layouts':
			props = COMPONENT_FIXTURES[category]
			break
		default:
			props = COMPONENT_FIXTURES['blocks'][component]
			break
	}
	return props
}
