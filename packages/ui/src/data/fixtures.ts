const links = [
	{slug: '', title: 'Home'},
	{slug: 'about', title: 'About'},
]

const nav = [
	{
		slug: 'ui',
		title: 'UI LIbrary Link - RevealNav Example',
		items: [
			{
				slug: 'blocks',
				title: 'Blocks Link 1',
				items: [
					{slug: 'item-1-a', title: 'RevealNav Item  1 A'},
					{slug: 'item-2-b', title: 'RevealNav Item  1 B'},
				],
			},
			{
				slug: 'blocks',
				title: 'Blocks Link 2',
			},
			{
				slug: 'blocks',
				title: 'Blocks Link 3',
				items: [
					{slug: 'item-2-a', title: 'RevealNav Item 2 A'},
					{slug: 'item-2-b', title: 'RevealNav Item 2 B'},
				],
			},
			{
				slug: 'blocks',
				title: 'Blocks Link 4',
			},
		],
	},
]

const menu = [
	{id: 'btn-1', label: 'Button 1', type: 'button', variant: '', icon: '💡'},
	{id: 'btn-2', label: 'Button 2', type: 'button', variant: '', icon: '🦁'},
	{id: 'btn-3', label: 'Button 3', type: 'button', variant: '', icon: '❤️'},
]

const toggle = [
	{id: 'toggle-1', label: 'Toggle 1'},
	{id: 'toggle-2', label: 'Toggle 2'},
	{id: 'toggle-3', label: 'Toggle 3'},
]

const sketch = {
	id: '004',
	slug: 'geometry-2d',
	title: 'Geometry 2D ',
	emoji: '📐',
}

export default {
	links,
	nav,
	menu,
	toggle,
	sketch,
}
