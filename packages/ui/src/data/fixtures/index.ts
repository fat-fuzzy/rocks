const navItems = [
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

const menuItems = [
	{id: 'btn-1', label: 'Button 1', type: 'button', icon: '💡'},
	{id: 'btn-2', label: 'Button 2', type: 'button', icon: '🦁'},
	{id: 'btn-3', label: 'Button 3', type: 'button', icon: '❤️'},
]

const scenes = [
	{
		slug: 'random-rect',
		name: 'Random',
		emoji: '🎰',
		duration: 2000,
	},
	{
		slug: 'random-rect-audio',
		name: 'Audio',
		emoji: '🥁',
		audio: true,
		duration: 4179,
		playbackRate: 2,
	},
	{
		slug: '2d',
		name: '2D',
		emoji: '📐',
		interactive: true,
		webGlProps: null,
	},
	{
		slug: 'poop',
		name: 'A Feature',
		emoji: '💩',
		type: 'test',
	},
]

export default {
	navItems,
	menuItems,
	scenes,
}
