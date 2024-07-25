const pages = [
	{path: '/', slug: '', title: 'Home'},
	{path: 'about', slug: 'about', title: 'About'},
	{path: '/dev', slug: 'dev', title: 'Dev'},
	{path: '/log', slug: 'log', title: 'Log'},
	{path: '/ui', slug: 'ui', title: 'UI'},
	{path: '/play', slug: 'play', title: 'Play'},
]

const categories = {
	path: pages[4].path,
	ready: ['Tokens', 'Blocks'],
	draft: ['Layouts', 'Recipes'],
}

const blocks = {
	path: `${pages[4].path}/blocks`,
	ready: [
		'Button',
		'Expand',
		'Switch',
		'Toggle',
		'Feedback',
		'InputCheck',
		'InputRadio',
		'InputRange',
		'InputFile',
	],
	draft: ['Fieldset'],
}

const layouts = {
	path: `${pages[4].path}/layouts`,
	ready: ['Burrito', 'Reveal', 'RevealAuto', 'Sidebar', 'Stack', 'Switcher'],
	draft: [],
}

const recipes = {
	path: `${pages[4].path}/recipes`,
	ready: [
		'ButtonMenu',
		'RevealMenu',
		'RevealNav',
		'ToggleMenu',
		'Header',
		'Nav',
	],
	draft: ['InputGroup', 'Login'],
}

export default {pages, categories, blocks, layouts, recipes}
