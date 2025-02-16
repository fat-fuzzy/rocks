const DEFAULT_CONTENT_TYPES = {
	ravioli: ['Ravioli 1', 'Ravioli 2', 'Ravioli 3'],
	form: ['Form input 1', 'Form input 2', 'Form input 3'],
	label: `This is some text that shows you how text content will adapt inside a chosen Layout. Layouts are components that are used to organize how content is displayed on the screen, and designed to work in harmony with the browser's built-in layout algorithms.`,
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

const PROPS_STATE: {[key: string]: any} = {
	states,
	content,
}

export default {
	PROPS_STATE,
}
