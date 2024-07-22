const DEFAULT_CONTENT_TYPES = {
	card: ['Card 1', 'Card 2', 'Card 3'],
	form: ['Form input 1', 'Form input 2', 'Form input 3'],
	text: `This is some text that shows you how text content will adapt inside a chosen Layout. Layouts are components that are used to organize how content is displayed on the screen, and designed to work in harmony with the browser's built-in layout algorithms.`,
}

const states = {
	Expand: {
		active: {id: 'button-expand', text: 'Expand', asset: 'emoji:point-down'},
		inactive: {id: 'button-expand', text: 'Expand', asset: 'emoji:point-right'},
	},
	Switch: {
		active: {id: 'button-switch', text: 'Rabbit', asset: 'emoji:switch-active'},
		inactive: {id: 'button-switch', text: 'Hat', asset: 'emoji:switch-inactive'},
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
