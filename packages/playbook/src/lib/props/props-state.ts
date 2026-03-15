import StateFamily from '$lib/api/styles.family'
import StateInputGroup from '$lib/api/styles.input-group'

// const brightness = {
// 	initial: 'day',
// 	input: 'toggle',
// 	layout: 'stack',
// 	size: '2xs',
// 	variant: 'bare',
// 	items: [
// 		{id: 'brightness.day', label: 'day', asset: 'day', value: 'day'},
// 		{
// 			id: 'brightness.night',
// 			label: 'night',
// 			asset: 'night',
// 			value: 'night',
// 		},
// 	],
// }

// const contrast = {
// 	initial: 'blend',
// 	input: 'toggle',
// 	layout: 'stack',
// 	size: '2xs',
// 	variant: 'bare',
// 	items: [
// 		{
// 			id: 'contrast.contrast',
// 			label: 'contrast',
// 			asset: 'contrast',
// 			value: 'contrast',
// 		},
// 		{
// 			id: 'contrast.blend',
// 			label: 'blend',
// 			asset: 'blend', // TODO: night / day asset option
// 			value: 'blend',
// 		},
// 	],
// }

const type = {
	initial: 'radio',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'outline',
	items: [
		{id: 'type.radio', label: 'radio', value: 'radio'},
		{
			id: 'type.checkbox',
			label: 'checkbox',
			value: 'checkbox',
		},
	],
}

// const content = {
// 	initial: 'ravioli',
// 	input: 'radio',
// 	layout: 'stack',
// 	size: '2xs',
// 	variant: 'bare',
// 	items: [
// 		{id: 'content.raviolo', label: 'raviolo', value: 'raviolo'},
// 		{id: 'content.form', label: 'form', value: 'form'},
// 		{id: 'content.text', label: 'text', value: 'text'},
// 	],
// }

// const side = {
// 	initial: 'ravioli',
// 	input: 'radio',
// 	layout: 'stack',
// 	size: '2xs',
// 	variant: 'bare',
// 	items: [
// 		{
// 			id: 'side.ravioli',
// 			label: 'ravioli',
// 			value: 'ravioli',
// 			parent: 'layout.sidebar',
// 		},
// 		{id: 'side.form', label: 'form', value: 'form', parent: 'layout.sidebar'},
// 		{id: 'side.text', label: 'text', value: 'text', parent: 'layout.sidebar'},
// 	],
// }

// const main = {
// 	initial: 'text',
// 	input: 'radio',
// 	layout: 'stack',
// 	size: '2xs',
// 	variant: 'bare',
// 	items: [
// 		{
// 			id: 'main.ravioli',
// 			label: 'ravioli',
// 			value: 'ravioli',
// 			parent: 'layout.sidebar',
// 		},
// 		{id: 'main.form', label: 'form', value: 'form', parent: 'layout.sidebar'},
// 		{id: 'main.text', label: 'text', value: 'text', parent: 'layout.sidebar'},
// 	],
// }

const settingsFamily = {
	layout: 'switcher',
	size: 'xs',
	justify: 'end',
	props: ['brightness', 'contrast'],
}

const contentFamily = {
	layout: 'flex',
	size: '2xs',
	props: ['content', 'side', 'main'],
}

const configFamily = {
	layout: 'flex',
	size: '2xs',
	props: ['type'],
}

// const DEFAULT_CONTENT_TYPES = {
// 	ravioli: ['Raviolo 1', 'Raviolo 2', 'Raviolo 3'],
// 	form: ['Form input 1', 'Form input 2', 'Form input 3'],
// 	label: `This is some text that shows you how text content will adapt inside a chosen Layout. Layouts are components that are used to organize how content is displayed on the screen, and designed to work in harmony with the browser's built-in layout algorithms.`,
// }

// const CONTENT_SAMPLES = {
// 	main: DEFAULT_CONTENT_TYPES,
// 	side: DEFAULT_CONTENT_TYPES,
// 	content: DEFAULT_CONTENT_TYPES,
// }

// eslint-disable-next-line
const FAMILIES: {[key: string]: any} = {
	// TODO: fix type
	settings: settingsFamily,
	content: contentFamily,
	config: configFamily,
}

// eslint-disable-next-line
const CATEGORIES: {[key: string]: any} = {
	// TODO: fix type
	app: {
		name: 'app',
		families: {
			// settings: FAMILIES['settings'],
			// content: FAMILIES['content'],
			config: FAMILIES['config'],
		},
	},
}

// eslint-disable-next-line
const PROPS_STATE: {[key: string]: any} = {
	// brightness,
	// contrast,
	type,
	// content,
	// side,
	// main,
}

function getInputGroup(name: string, category: string, family: string) {
	const slug = name.toLowerCase()
	return new StateInputGroup({
		name,
		id: `${category}.${family}.${slug}`,
		value: PROPS_STATE[slug].initial,
		input: PROPS_STATE[slug].input,
		layout: PROPS_STATE[slug].layout,
		size: PROPS_STATE[slug].size,
		mode: PROPS_STATE[slug].mode,
		variant: PROPS_STATE[slug].variant,
		container: PROPS_STATE[slug].container,
		items: PROPS_STATE[slug].items.map((item) => {
			return {...item, id: `${category}.${family}.${item.id}`}
		}),
	})
}

function getFamily(familyId: string) {
	const [category, family] = familyId.split('.')
	const slug = family

	return new StateFamily({
		name: slug,
		title: '',
		id: `${category}.${slug}`,
		layout: FAMILIES[slug].layout,
		size: FAMILIES[slug].size,
		variant: FAMILIES[slug].variant,
		items: FAMILIES[slug].props.map((prop) => {
			return getInputGroup(prop, category, slug)
		}),
	})
}

export {PROPS_STATE, FAMILIES, CATEGORIES, getInputGroup, getFamily}
