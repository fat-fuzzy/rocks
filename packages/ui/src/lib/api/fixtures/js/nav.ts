export const links = {
	main: [{slug: 'about', title: 'About'}],
	side: [
		{
			id: 'button-theme',
			title: 'Theme',
			action: 'theme',
			asset: 'day',
			type: 'emoji',
			variant: 'round',
		},
		{
			id: 'link-github',
			title: 'GitHub icon',
			url: 'https://github.com/fat-fuzzy/rocks',
			asset: 'day',
			type: 'icon',
			variant: 'round',
		},
		// 	id: 'menu-lang',
		// 	title: 'Lang',
		// 	asset: langMenuIcon,
		// 	type: 'emoji',
		// 	// TODO: figure out a better way to [name / deal with] submenu items - see LinkList component
		// 	subitems: languages.map((l) => ({
		// 		id: l.code,
		// 		title: l.title,
		// 		action: setLanguage,
		// 		asset: langEmojis[l.code],
		// 		type: 'emoji',
		// 	})),
		// },
	],
}
