const config = {
	media: [
		{
			query: '(min-width: 3600px)',
			srcset: [
				{
					width: 2000,
					dpr: 2,
				},
			],
		},
		{
			query: '(min-width: 1000px)',
			srcset: [
				{
					width: 1500,
					dpr: 1.5,
				},
			],
		},
		{
			query: '(min-width: 800px)',
			srcset: [
				{
					width: 1000,
					dpr: 1,
				},
				{
					width: 1500,
					dpr: 2,
				},
			],
		},
		{
			query: '(min-width: 500px)',
			srcset: [
				{
					width: 500,
					dpr: 1,
				},
			],
		},
	],
	srcset: [
		{
			width: 2000,
			media: [
				{
					query: '(min-width: 1200px)',
					dpr: 1.5,
				},
				{
					query: '(min-width: 1000px)',
					dpr: 2,
				},
				{
					query: '(min-width: 600px)',
					dpr: 3,
				},
			],
		},
		{
			width: 1500,
			media: [
				{
					query: '(min-width: 1000px)',
					dpr: 1.5,
				},
				{
					query: '(min-width: 750px)',
					dpr: 2,
				},
				{
					query: '(min-width: 530px)',
					dpr: 2.5,
				},
			],
		},
		{
			width: 1000,
			media: [
				{
					query: '(min-width: 970px)',
					dpr: 1,
				},
				{
					dpr: 2,
				},
			],
		},
		{
			width: 500,
			media: [
				{
					query: '(min-width: 430px)',
					dpr: 1,
				},
				{
					query: '(min-width: 300px)',
					dpr: 1.5,
				},
				{
					dpr: 2,
				},
			],
		},
	],
	sizes: [
		{
			query: '(min-width:1620px)',
			slot: '60vw',
		},
		{
			query: '(min-width:1360px)',
			slot: '60vw',
		},
		{
			query: '(min-width:935px)',
			slot: '70vw',
		},
		{
			slot: '100vw',
		},
	],
}

export default config
