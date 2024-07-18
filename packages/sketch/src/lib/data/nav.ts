export const links = [{slug: 'play', title: 'Play', layout: 'sidebar'}]

export const itemsSettings = {
	switch: [
		{
			id: 'brightness',
			name: 'brightness',
			title: 'Brightness',
			variant: 'outline',
			shape: 'round',
			color: 'primary',
			size: 'md',
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
					initial: 'pressed',
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
			size: 'md',
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
					initial: 'pressed',
				},
			},
		},
	],
	links: [
		{
			id: 'link-github',
			title: 'GitHub icon',
			url: 'https://github.com/fat-fuzzy/rocks',
			asset: 'svg:github',
			shape: 'round',
			size: 'md',
			color: 'primary',
		},
	],
}
