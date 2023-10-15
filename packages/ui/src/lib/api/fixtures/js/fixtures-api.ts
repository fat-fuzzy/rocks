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
	let props = []
	switch (category) {
		case 'blocks':
		case 'graphics':
		case 'compositions':
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
