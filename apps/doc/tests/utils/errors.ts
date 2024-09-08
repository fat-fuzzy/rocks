const httpErrors: {
	[key: string]: {
		condition: string
		code: number
		testFn: (page: any, item: any) => Promise<unknown>
		message: string
	}
} = {
	'404': {
		condition: 'child content not found',
		testFn: async (page, item) => {
			if (item.path !== '/') {
				await page.goto(`${item.path}/blah`)
			} else {
				await page.goto(`/blah`)
			}
		},
		code: 404,
		message: '404: Not Found',
	},
}

export default {httpErrors}
