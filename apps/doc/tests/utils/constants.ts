const pages = [
	{path: '/', slug: '', title: 'Home'},
	{
		path: '/doc',
		slug: 'doc',
		title: 'Doc',
		items: [
			{path: '/doc/usage', slug: 'usage', title: 'Usage', linkTitle: 'Usage'},
			{
				path: '/doc/decisions',
				slug: 'decisions',
				title: 'Decisions Log',
				linkTitle: 'Usage',
			},
		],
	},
	{path: '/ui', slug: 'ui', title: 'UI'},
	{path: '/play', slug: 'play', title: 'Play'},
	{path: '/blog', slug: 'blog', title: 'Blog'},
]

const categories = {
	path: () => pages.find(({slug}) => slug === 'ui')?.path ?? '/ui',
	ready: ['Tokens', 'Blocks'],
	draft: ['Layouts', 'Recipes'],
}

const blocks = {
	path: () => {
		const parent = pages.find(({slug}) => slug === 'ui')?.path
		if (parent) return `${parent}/blocks`
		return '/ui/blocks'
	},
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
	draft: ['Fieldset', 'InputGroup', 'Picture', 'Magic'],
}

const layouts = {
	path: () => {
		const parent = pages.find(({slug}) => slug === 'ui')?.path
		if (parent) return `${parent}/layouts`
		return '/ui/layouts'
	},
	ready: ['Burrito', 'Reveal', 'RevealAuto', 'Sidebar', 'Stack', 'Switcher'],
	draft: [],
}

const recipes = {
	path: () => {
		const parent = pages.find(({slug}) => slug === 'ui')?.path
		if (parent) return `${parent}/recipes`
		return '/ui/recipes'
	},
	ready: [
		'ButtonMenu',
		'RevealMenu',
		'RevealNav',
		'ToggleMenu',
		'Header',
		'Nav',
		'SignUp',
	],
	draft: [],
}

export default {pages, categories, blocks, layouts, recipes}
