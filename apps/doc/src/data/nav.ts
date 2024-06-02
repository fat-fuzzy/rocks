export const links = [
	{slug: 'about', title: 'About', layout: 'center'},
	{slug: 'dev', title: 'Dev', layout: 'sidebar'},
	{slug: 'ui', title: 'UI', layout: 'sidebar'},
	{slug: 'log', title: 'Log', layout: 'sidebar'},
]

export const itemsSettings = {
	switch: [
		{
			id: 'brightness',
			name: 'brightness',
			title: 'Brightness',
			variant: 'outline',
			shape: 'round',
			color: 'primary',
			size: 'sm',
			value: 'day',
			states: {
				active: {
					id: 'app.brightness.night',
					text: 'night',
					value: 'night',
					asset: 'night',
				},
				inactive: {
					id: 'app.brightness.day',
					text: 'day',
					value: 'day',
					asset: 'day',
				},
			},
		},
		{
			id: 'contrast',
			name: 'contrast',
			title: 'Contrast',
			variant: 'outline',
			shape: 'round',
			color: 'primary',
			size: 'sm',
			value: 'blend',
			states: {
				active: {
					id: 'app.contrast.contrast',
					text: 'contrast',
					value: 'contrast',
					asset: 'contrast',
				},
				inactive: {
					id: 'app.contrast.blend',
					text: 'blend',
					value: 'blend',
					asset: 'blend',
				},
			},
		},
	],
	links: [
		{
			id: 'link-github',
			title: 'GitHub icon',
			url: 'https://github.com/fat-fuzzy/rocks',
			asset: 'svg:icon-github',
			shape: 'round',
			size: 'xs',
		},
	],
}
