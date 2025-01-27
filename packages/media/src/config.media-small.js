// Config for media page with zoom dialog

const config = {
	media: [
		{
			query: '(min-width: 300px)',
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
			width: 500,
			media: [
				{
					dpr: 2,
				},
				{
					query: '(min-width: 300px)',
					dpr: 1.5,
				},
				{
					query: '(min-width: 430px)',
					dpr: 1,
				},
			],
		},
	],
	sizes: [
		{
			slot: '600px',
		},
	],
}

export default config
