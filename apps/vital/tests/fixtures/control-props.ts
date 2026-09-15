const TAGS_PROPS = [
	{
		props: {
			cta: 'edit',
			loading: false,
			error: false,

			tags: [
				{
					title: 'Group 1',
					name: 'group-1',
					type: 'radio',
					items: ['one', 'two', 'three'],
				},
				{
					title: 'Group 2',
					name: 'group-1',
					items: ['four', 'five', 'six'],
				},
			],
			oninput: () => {},
		},
		expected: {
			selected: {
				id: 'button-1',
				name: 'button-1',
				oninput: () => {},
			},
		},
	},
]

export {TAGS_PROPS}
