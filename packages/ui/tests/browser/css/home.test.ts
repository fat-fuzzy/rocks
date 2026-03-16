import {describe, it, expect} from 'vitest'
import {page} from 'vitest/browser'

describe('CSS - css stylesheet test', () => {
	it.skip('index page has expected headings', async () => {
		expect(
			page.getByRole('heading', {name: 'CSS Pattern library'}),
		).toBeVisible()
	})
})
