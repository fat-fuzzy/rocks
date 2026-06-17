const DEFAULT_CONTENT_TYPES = {
	ravioli: ['Raviolo 1', 'Raviolo 2', 'Raviolo 3'],
	form: ['Form input 1', 'Form input 2', 'Form input 3'],
	label: `This paragraph shows how text content will adapt inside a chosen Layout. Layouts are components that help to organize how content is displayed on the screen. They are versatile, efficient, and designed to work in harmony with the browser's built-in layout algorithms.`,
}

const states = {
	Expand: {
		expanded: {
			id: 'button-collapse',
			value: 'collapse',
			label: 'Collapse',
			asset: 'point-down',
		},
		collapsed: {
			id: 'button-expand',
			value: 'expand',
			label: 'Expand',
			asset: 'point-right',
		},
	},
	Switch: {
		active: {id: 'button-switch', label: 'Rabbit', asset: 'switch-active'},
		inactive: {id: 'button-switch', label: 'Hat', asset: 'switch-inactive'},
	},
}

const content = {
	main: DEFAULT_CONTENT_TYPES,
	side: DEFAULT_CONTENT_TYPES,
	content: DEFAULT_CONTENT_TYPES,
}

const PROPS_STATE: {[key: string]: unknown} = {
	states,
	content,
}

export default {
	PROPS_STATE,
}
