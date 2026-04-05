const pages = [
	{path: '/', slug: '', title: 'Home', label: 'Home'},
	{
		path: '/about',
		slug: 'about',
		title: 'About',
		label: 'About',
		items: [
			{
				path: '/about/usage',
				slug: 'usage',
				title: 'Usage',
				label: 'Usage',
				linkTitle: 'Usage',
			},
			{
				path: '/about/decisions',
				slug: 'decisions',
				title: 'Decisions',
				label: 'Decisions',
				linkTitle: 'Decisions',
			},
		],
	},
	{path: '/ui', slug: 'ui', title: 'UI', label: 'UI'},
	{path: '/play', slug: 'play', title: 'Play', label: 'Play'},
	{path: '/blog', slug: 'blog', title: 'Blog', label: 'Blog'},
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
		'InputGroup',
		'InputRange',
		'InputFile',
		'Magic',
	],
	draft: ['Fieldset', 'Picture'],
}

const layouts = {
	path: () => {
		const parent = pages.find(({slug}) => slug === 'ui')?.path
		if (parent) return `${parent}/layouts`
		return '/ui/layouts'
	},
	ready: ['Burrito', 'Reveal', 'Sidebar', 'Stack', 'Switcher'],
	draft: [],
}

const recipes = {
	path: () => {
		const parent = pages.find(({slug}) => slug === 'ui')?.path
		if (parent) return `${parent}/recipes`
		return '/ui/recipes'
	},
	ready: ['ButtonMenu', 'ToggleMenu', 'Nav', 'SignUp'],
	draft: [],
}

export default {pages, categories, blocks, layouts, recipes}
