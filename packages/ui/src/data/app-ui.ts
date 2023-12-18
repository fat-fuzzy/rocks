const APP_LINKS = [
	{slug: 'about', title: 'About'},
	{slug: 'test', title: 'Test'},
]

const APP_SETTINGS = {
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
				active: {text: 'night', value: 'night', asset: 'emoji:night'},
				inactive: {text: 'day', value: 'day', asset: 'emoji:day'},
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
				active: {text: 'contrast', value: 'contrast', asset: 'emoji:contrast'},
				inactive: {text: 'blend', value: 'blend', asset: 'emoji:blend'},
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

const TABS_CONTENT = [
	{
		id: 'context.menu.toggle.demo',
		title: 'Demo',
		size: 'xl',
		color: 'accent',
		asset: 'emoji:demo',
		value: 'demo',
	},
	{
		id: 'context.menu.toggle.doc',
		title: 'Doc',
		size: 'xl',
		color: 'primary',
		asset: 'emoji:doc',
		value: 'doc',
	},
]

export {APP_LINKS, APP_SETTINGS, TABS_CONTENT}
