export const links = {
	main: [
		{slug: 'about', title: 'About'},
		{slug: 'doc', title: 'Doc'},
	],
	side: [
		{
			id: 'button-theme',
			title: 'Theme',
			action: 'theme',
			asset: 'emoji',
			variant: 'round',
			size: 'xl',
		},
		{
			id: 'link-github',
			title: 'GitHub icon',
			url: 'https://github.com/fat-fuzzy/rocks',
			asset: 'svg',
			variant: 'round',
			size: 'md',
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
