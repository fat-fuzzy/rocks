export const links = [{slug: 'about', title: 'About', layout: 'center'}]

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
				active: {text: 'night', value: 'night', asset: 'night'},
				inactive: {text: 'day', value: 'day', asset: 'day'},
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
				active: {text: 'contrast', value: 'contrast', asset: 'contrast'},
				inactive: {text: 'blend', value: 'blend', asset: 'blend'},
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
